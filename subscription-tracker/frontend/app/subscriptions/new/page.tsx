'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../src/context/AuthContext';
import { api } from '../../../lib/api';
import { categoriesApi } from '../../../lib/api';
import { ProtectedRoute } from '../../../src/components/ProtectedRoute';

const defaultCategories = [
  { value: 'entertainment', label: 'Развлечения', icon: 'film', id: '' },
  { value: 'software', label: 'ПО', icon: 'computer', id: '' },
  { value: 'cloud', label: 'Облачное хранилище', icon: 'cloud', id: '' },
  { value: 'music', label: 'Музыка', icon: 'music', id: '' },
  { value: 'video', label: 'Видео стриминг', icon: 'play', id: '' },
  { value: 'fitness', label: 'Фитнес', icon: 'heart', id: '' },
  { value: 'education', label: 'Образование', icon: 'book', id: '' },
  { value: 'other', label: 'Другое', icon: 'more', id: '' }
];

const billingCycles = [
  { value: 'monthly', label: 'Ежемесячно', icon: 'calendar' },
  { value: 'yearly', label: 'Ежегодно', icon: 'calendar-alt' },
  { value: 'quarterly', label: 'Ежеквартально', icon: 'calendar-week' },
  { value: 'weekly', label: 'Еженедельно', icon: 'calendar-day' },
];

const currencies = [
  { value: 'RUB', label: 'RUB', flag: 'RUB' },
  { value: 'USD', label: 'USD', flag: 'USD' },
  { value: 'EUR', label: 'EUR', flag: 'EUR' },
  { value: 'GBP', label: 'GBP', flag: 'GBP' }
];

export default function NewSubscriptionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(defaultCategories);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'entertainment',
    categoryId: '',
    amount: '',
    currency: 'RUB',
    billingCycle: 'monthly',
    nextBillingDate: '',
    isActive: true,
    logoUrl: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    amount: '',
    nextBillingDate: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const userCategories = await categoriesApi.getAll();
      if (userCategories && userCategories.length > 0) {
        const mappedCategories = userCategories.map((cat: any) => ({
          value: cat.name,
          label: cat.name,
          icon: cat.icon || 'tag',
          id: cat.id,
        }));
        setCategories(mappedCategories);
        if (mappedCategories.length > 0) {
          setForm({ ...form, category: mappedCategories[0].value, categoryId: mappedCategories[0].id });
        }
      }
    } catch (err) {
      console.error('Failed to fetch categories, using defaults:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const validateName = (name: string): { valid: boolean; message?: string } => {
    if (!name.trim()) {
      return { valid: false, message: 'Название обязательно' };
    }
    if (name.length < 2) {
      return { valid: false, message: 'Название должно содержать минимум 2 символа' };
    }
    if (name.length > 100) {
      return { valid: false, message: 'Название слишком длинное' };
    }
    return { valid: true };
  };

  const validateAmount = (amount: string): { valid: boolean; message?: string } => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) {
      return { valid: false, message: 'Сумма обязательна' };
    }
    if (numAmount <= 0) {
      return { valid: false, message: 'Сумма должна быть больше 0' };
    }
    if (numAmount > 1000000) {
      return { valid: false, message: 'Сумма слишком большая' };
    }
    return { valid: true };
  };

  const validateDate = (date: string): { valid: boolean; message?: string } => {
    if (!date) {
      return { valid: false, message: 'Дата обязательна' };
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { valid: false, message: 'Дата не может быть в прошлом' };
    }
    return { valid: true };
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({ ...form, name: value });
    const validation = validateName(value);
    if (!validation.valid && value) {
      setFieldErrors({ ...fieldErrors, name: validation.message || '' });
    } else {
      setFieldErrors({ ...fieldErrors, name: '' });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({ ...form, amount: value });
    const validation = validateAmount(value);
    if (!validation.valid && value) {
      setFieldErrors({ ...fieldErrors, amount: validation.message || '' });
    } else {
      setFieldErrors({ ...fieldErrors, amount: '' });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({ ...form, nextBillingDate: value });
    const validation = validateDate(value);
    if (!validation.valid && value) {
      setFieldErrors({ ...fieldErrors, nextBillingDate: validation.message || '' });
    } else {
      setFieldErrors({ ...fieldErrors, nextBillingDate: '' });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Только изображения разрешены');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Размер файла не должен превышать 5MB');
      return;
    }

    setLogoFile(file);
    setUploadingLogo(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/uploads/logo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }

      const data = await response.json();
      setForm({ ...form, logoUrl: data.url });
      setLogoPreview(URL.createObjectURL(file));
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки логотипа');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({ name: '', amount: '', nextBillingDate: '' });

    // Validate form
    const nameValidation = validateName(form.name);
    if (!nameValidation.valid) {
      setFieldErrors({ ...fieldErrors, name: nameValidation.message || '' });
      return;
    }

    const amountValidation = validateAmount(form.amount);
    if (!amountValidation.valid) {
      setFieldErrors({ ...fieldErrors, amount: amountValidation.message || '' });
      return;
    }

    const dateValidation = validateDate(form.nextBillingDate);
    if (!dateValidation.valid) {
      setFieldErrors({ ...fieldErrors, nextBillingDate: dateValidation.message || '' });
      return;
    }

    setLoading(true);

    try {
      console.log('Submitting form:', form);
      const subscriptionData = {
        name: form.name,
        category: form.category,
        categoryId: form.categoryId || undefined,
        amount: parseFloat(form.amount),
        currency: form.currency,
        billingCycle: form.billingCycle,
        nextBillingDate: form.nextBillingDate,
        isActive: form.isActive,
        logoUrl: form.logoUrl || undefined,
      };
      console.log('Sending data:', subscriptionData);
      
      const response = await api.post('/subscriptions', subscriptionData);
      console.log('Subscription created:', response);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error creating subscription:', err);
      setError(err.message || 'Не удалось создать подписку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Enhanced animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/12 via-pink-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-blue-600/12 via-indigo-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '8s', animationDuration: '30s' }}></div>
          <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/8 via-purple-600/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '15s', animationDuration: '35s' }}></div>
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-pink-600/10 via-rose-600/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '5s', animationDuration: '20s' }}></div>
        </div>
        {/* Enhanced subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>
        </div>
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Header */}
        <div className="relative z-10 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-sm transition-colors duration-300 hover:bg-black/70">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link 
                  href="/dashboard" 
                  className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-semibold text-base">Вернуться к подпискам</span>
                </Link>
                <div className="h-8 w-px bg-white/10"></div>
                <h1 className="text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Новая подписка</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <div className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-white/30">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Enhanced Form Header */}
            <div className="bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-rose-600/50 px-12 py-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl -mr-40 -mt-40 animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -ml-32 -mb-32 animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }}></div>
              </div>
              <div className="relative z-10 flex items-center space-x-8">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Добавить подписку</h2>
                  <p className="text-white/80 text-lg">Отслеживайте свои расходы точно</p>
                </div>
              </div>
            </div>

            {/* Enhanced Form Content */}
            <div className="p-12 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Enhanced Название подписки */}
                <div className="space-y-4">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-purple-600/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                      </svg>
                    </div>
                    Название
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleNameChange}
                    placeholder="Например, Netflix"
                    required
                    className={`w-full px-6 py-5 text-lg border-2 rounded-2xl focus:ring-4 transition-all duration-300 bg-white/5 backdrop-blur-xl hover:border-white/30 font-medium text-white shadow-lg focus:shadow-2xl ${fieldErrors.name ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/30' : 'border-white/20 focus:border-purple-500/50 focus:ring-purple-500/30'}`}
                  />
                  {fieldErrors.name && (
                    <p className="text-red-400 text-sm mt-2">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Enhanced Amount and Валюта */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label htmlFor="amount" className="block text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-purple-600/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      Сумма
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="amount"
                        value={form.amount}
                        onChange={handleAmountChange}
                        required
                        min="0"
                        step="0.01"
                        className={`w-full px-6 py-5 text-lg border-2 rounded-2xl focus:ring-4 transition-all duration-300 bg-white/5 backdrop-blur-xl font-medium pl-14 text-white shadow-lg focus:shadow-2xl ${fieldErrors.amount ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/30' : 'border-white/20 focus:border-purple-500/50 focus:ring-purple-500/30'}`}
                        placeholder="299.00"
                      />
                      {fieldErrors.amount && (
                        <p className="text-red-400 text-sm mt-2">{fieldErrors.amount}</p>
                      )}
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 font-bold text-xl">₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="currency" className="block text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-purple-600/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Валюта
                    </label>
                    <div className="relative">
                      <select
                        id="currency"
                        value={form.currency}
                        onChange={(e) => setForm({ ...form, currency: e.target.value })}
                        className="w-full px-6 py-5 text-lg border-2 border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 bg-white/5 backdrop-blur-xl hover:border-white/30 font-medium appearance-none cursor-pointer text-white shadow-lg focus:shadow-2xl"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Category and Период списания */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label htmlFor="category" className="block text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-purple-600/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      Категория
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        value={form.category}
                        onChange={(e) => {
                          const selectedCategory = categories.find(c => c.value === e.target.value);
                          setForm({ 
                            ...form, 
                            category: e.target.value,
                            categoryId: selectedCategory?.id || ''
                          });
                        }}
                        className="w-full px-6 py-5 text-lg border-2 border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 bg-white/5 backdrop-blur-xl hover:border-white/30 font-medium appearance-none cursor-pointer text-white shadow-lg focus:shadow-2xl"
                      >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="billingCycle" className="block text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-purple-600/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Период списания
                    </label>
                    <div className="relative">
                      <select
                        id="billingCycle"
                        value={form.billingCycle}
                        onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
                        className="w-full px-6 py-5 text-lg border-2 border-white/20 rounded-2xl focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 bg-white/5 backdrop-blur-xl hover:border-white/30 font-medium appearance-none cursor-pointer text-white shadow-lg focus:shadow-2xl"
                      >
                        {billingCycles.map((cycle) => (
                          <option key={cycle.value} value={cycle.value}>
                            {cycle.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Дата следующего списания */}
                <div className="space-y-4">
                  <label htmlFor="nextBillingDate" className="block text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-purple-600/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Дата следующего списания
                  </label>
                  <input
                    type="date"
                    id="nextBillingDate"
                    value={form.nextBillingDate}
                    onChange={handleDateChange}
                    required
                    className={`w-full px-6 py-5 text-lg border-2 rounded-2xl focus:ring-4 transition-all duration-300 bg-white/5 backdrop-blur-xl font-medium text-white shadow-lg focus:shadow-2xl ${fieldErrors.nextBillingDate ? 'border-red-500 focus:border-red-500/50 focus:ring-red-500/30' : 'border-white/20 focus:border-purple-500/50 focus:ring-purple-500/30'}`}
                  />
                  {fieldErrors.nextBillingDate && (
                    <p className="text-red-400 text-sm mt-2">{fieldErrors.nextBillingDate}</p>
                  )}
                </div>

                {/* Enhanced Error */}
                {error && (
                  <div className="p-6 bg-red-500/10 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-5 shadow-xl shadow-red-500/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-200 font-semibold text-base">{error}</p>
                    </div>
                  </div>
                )}

                {/* Enhanced Form Actions */}
                <div className="flex flex-col sm:flex-row gap-6 pt-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-600/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin mr-4"></div>
                          Добавление...
                        </>
                      ) : (
                        <>
                          Добавить подписку
                        </>
                      )}
                    </div>
                  </button>
                  
                  <Link
                    href="/dashboard"
                    className="flex-1 sm:flex-initial bg-white/5 border-2 border-white/20 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative">Отмена</span>
                  </Link>
                </div>
              </form>

              {/* Enhanced Совет */}
              <div className="mt-12 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12 a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight">💡 Совет</h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      Добавляйте все свои подписки — от стриминговых сервисов до программного обеспечения. Это поможет вам увидеть полную картину расходов и найти возможности для экономии.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
