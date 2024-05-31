export type Job = {
  title: string;
  company: string;
  url: string;
  location?: string;
  description: string;
  createdAt: string;
};

export type ApiResponse = {
  data: Job[];
  meta: {
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
  };
};

export type SearchOptions = {
  title?: string;
  company?: string;
};
