import { Request, Response, NextFunction } from 'express';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function parsePaginationParams(req: Request, defaultLimit: number = 10, maxLimit: number = 100): PaginationOptions {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(req.query.limit as string) || defaultLimit));
  const sortBy = (req.query.sortBy as string) || 'createdAt';
  const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

  return {
    page,
    limit,
    sortBy,
    sortOrder,
  };
}

export function createPaginationResult<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginationResult<T> {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
  };
}

export function addPaginationHeaders(res: Response, pagination: PaginationResult<any>['pagination']) {
  res.setHeader('X-Total-Count', pagination.total.toString());
  res.setHeader('X-Total-Pages', pagination.totalPages.toString());
  res.setHeader('X-Current-Page', pagination.page.toString());
  res.setHeader('X-Per-Page', pagination.limit.toString());
  res.setHeader('X-Has-Next', pagination.hasNext.toString());
  res.setHeader('X-Has-Prev', pagination.hasPrev.toString());
}

export function paginateArray<T>(array: T[], page: number, limit: number): PaginationResult<T> {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = array.slice(startIndex, endIndex);

  return createPaginationResult(data, page, limit, total);
}

export function validatePagination(req: Request, res: Response, next: NextFunction) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (page < 1 || limit < 1 || limit > 100) {
    return res.status(400).json({
      message: 'Некорректные параметры пагинации',
      errors: {
        page: page < 1 ? 'Страница должна быть >= 1' : undefined,
        limit: limit < 1 ? 'Лимит должен быть >= 1' : limit > 100 ? 'Лимит должен быть <= 100' : undefined,
      }
    });
  }

  next();
}
