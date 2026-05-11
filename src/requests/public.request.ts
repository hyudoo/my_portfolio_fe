import { publicRequest } from '../utils/api.util';
import {
  CreateContactBody,
  GetPublicProjectCategoriesResponse,
  GetPublicProjectsResponse,
  GetPublicSettingsResponse,
  GetPublicSkillsResponse,
  LocaleQuery,
  MessageResponse,
  SubscribeBody,
} from '../types/requests/public.type';

export const publicApi = {
  getSettings: async (params?: LocaleQuery) => {
    const { data } = await publicRequest.get<GetPublicSettingsResponse>('/public/settings', { params });
    return data;
  },

  getSkills: async (params?: LocaleQuery) => {
    const { data } = await publicRequest.get<GetPublicSkillsResponse>('/public/skills', { params });
    return data;
  },

  getProjectCategories: async (params?: LocaleQuery) => {
    const { data } = await publicRequest.get<GetPublicProjectCategoriesResponse>('/public/project-categories', { params });
    return data;
  },

  getProjects: async (params?: LocaleQuery) => {
    const { data } = await publicRequest.get<GetPublicProjectsResponse>('/public/projects', { params });
    return data;
  },

  submitContact: async (body: CreateContactBody) => {
    await publicRequest.post('/public/contact', body);
  },

  subscribe: async (body: SubscribeBody) => {
    const { data } = await publicRequest.post<MessageResponse>('/public/subscribe', body);
    return data;
  },

  confirmSubscribe: async (token: string) => {
    const { data } = await publicRequest.get<MessageResponse>('/public/subscribe/confirm', { params: { token } });
    return data;
  },

  unsubscribe: async (token: string) => {
    const { data } = await publicRequest.get<MessageResponse>('/public/unsubscribe', { params: { token } });
    return data;
  },
};
