'use client';

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatisticsProps {
  subscriptions: any[];
}

const COLORS = ['#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    entertainment: 'Развлечения',
    software: 'ПО',
    cloud: 'Облако',
    music: 'Музыка',
    video: 'Видео',
    fitness: 'Фитнес',
    education: 'Образование',
    other: 'Другое'
  };
  return names[category] || category;
};

const getMonthName = (monthKey: string) => {
  const [year, month] = monthKey.split('-');
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const monthIndex = parseInt(month) - 1;
  return `${monthNames[monthIndex]} ${year}`;
};

export function Statistics({ subscriptions }: StatisticsProps) {
  // Calculate expenses by category
  const categoryData = subscriptions.reduce((acc: any, sub: any) => {
    const category = sub.category || 'Другое';
    const amount = sub.amount || 0;
    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name: getCategoryName(name),
    value,
  }));

  // Calculate monthly expenses
  const monthlyData = subscriptions.reduce((acc: any, sub: any) => {
    const date = new Date(sub.nextBillingDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const amount = sub.amount || 0;
    
    if (acc[monthKey]) {
      acc[monthKey] += amount;
    } else {
      acc[monthKey] = amount;
    }
    return acc;
  }, {});

  const barData = Object.entries(monthlyData)
    .map(([name, value]) => ({
      name: getMonthName(name),
      value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 p-8 hover:shadow-3xl hover:shadow-purple-700/15 transition-all duration-300 hover:-translate-y-1">
        <div className="bg-gradient-to-r from-purple-700/50 via-pink-700/50 to-rose-700/50 px-8 py-6 rounded-2xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl -ml-16 -mb-16"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white tracking-tight">Статистика</h3>
            <p className="text-white/70 text-sm mt-1">Анализ расходов</p>
          </div>
        </div>
        <p className="text-gray-400 text-center py-8">Добавьте подписки для просмотра статистики</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 p-8 hover:shadow-3xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
      <div className="bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-rose-600/40 px-8 py-6 rounded-2xl mb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded-full blur-3xl -ml-24 -mb-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white tracking-tight">Статистика</h3>
          <p className="text-white/80 text-sm mt-1">Анализ расходов по категориям и месяцам</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expenses by Category */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-rose-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-purple-500/40 transition-all duration-500">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 shadow-xl shadow-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div>
                <span className="text-white">Расходы по категориям</span>
                <div className="text-xs text-white/60 mt-1">Распределение трат</div>
              </div>
            </h4>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={95}
                  fill="#8884d8"
                  dataKey="value"
                  innerRadius={40}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 15, 35, 0.95)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)', 
                    borderRadius: '16px',
                    color: '#ffffff',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)'
                  }}
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(value: any, name: any) => `${name}: ${value ? value.toLocaleString('ru-RU') : 0} ₽`}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-br from-pink-900/30 via-rose-900/30 to-orange-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-pink-500/40 transition-all duration-500">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-xl shadow-pink-500/30 group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <span className="text-white">Ежемесячные расходы</span>
                <div className="text-xs text-white/60 mt-1">Динамика по месяцам</div>
              </div>
            </h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255, 255, 255, 0.5)" 
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.5)" 
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                />
                <Legend 
                  formatter={() => 'Сумма'}
                  wrapperStyle={{ paddingBottom: '10px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#gradientBar)" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={60}
                  animationBegin={0}
                  animationDuration={800}
                />
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={1} />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity={1} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
