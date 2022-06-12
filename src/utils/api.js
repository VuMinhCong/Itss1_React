export const createUrl = async (code, url) => {
  const res = await fetch('https://nourl.herokuapp.com/api/urls/create', {
    method: 'post',
    body: JSON.stringify({ code, url }),
  }).then((rs) => rs.json());

  if (!res || res.stt !== 'ok') {
    throw res ? res.msg : 'bad request';
  }

  return res.data;
};

export const updateUrl = async (oldCode, { code, url }) => {
  const res = await fetch('https://nourl.herokuapp.com/api/urls/update', {
    method: 'put',
    body: JSON.stringify({ old_code: oldCode, info: { code, url } }),
  }).then((rs) => rs.json());

  if (!res || res.stt !== 'ok') {
    throw res ? res.msg : 'bad request';
  }

  return res.data;
};
