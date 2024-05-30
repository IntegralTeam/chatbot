import { api } from '@/api/backend';
import { ApiEndpoint } from '@/appConstants';

export const startApi = async ({
  chat_id,
}:
  {
    chat_id: string,
  }): Promise<string> => {
  const { data } = await api.get(
    `${ApiEndpoint.start}`,
    {
      params: {
        chat_id,
      }
    },
  );

  console.log({
    data,
  })

  return `${data}`;
};

export const askApi = async ({
  chat_id,
  question,
}:
  {
    chat_id: string,
    question: string,
  }): Promise<string> => {
  const { data } = await api.get(
    `${ApiEndpoint.ask}`,
    {
      params: {
        chat_id,
        question,
      }
    },
  );

  return `${data.message}`;
};

export const updateNameApi = async ({
  chat_id,
  name,
}:
  {
    chat_id: string,
    name: string,
  }): Promise<string> => {
  const { data } = await api.get(
    `${ApiEndpoint.updateName}`,
    {
      params: {
        chat_id,
        name,
      }
    },
  );

  return `${data.data}`;
};

export const updateTraitsApi = async ({
  chat_id,
  traits,
}:
  {
    chat_id: string,
    traits: string,
  }): Promise<string> => {
  const { data } = await api.get(
    `${ApiEndpoint.updateTraits}`,
    {
      params: {
        chat_id,
        traits,
      }
    },
  );

  return `${data.data}`;
};

export const updateExpertiseApi = async ({
  chat_id,
  expertise,
}:
  {
    chat_id: string,
    expertise: string,
  }): Promise<string> => {
  const { data } = await api.get(
    `${ApiEndpoint.updateExpertise}`,
    {
      params: {
        chat_id,
        expertise,
      }
    },
  );

  return `${data.data}`;
};

export const updateUrlApi = async ({
  chat_id,
  urls,
}:
  {
    chat_id: string,
    urls: string,
  }): Promise<string> => {
  const { data } = await api.get(
    `${ApiEndpoint.updateUrl}`,
    {
      params: {
        chat_id,
        urls,
      }
    },
  );

  return `${data.data}`;
};
