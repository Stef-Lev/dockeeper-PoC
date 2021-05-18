export const getDoc = (url, id) => {
  return fetch(url + id).then((res) => res.json());
};

export const getAllDocs = (url) => {
  return fetch(url).then((res) => res.json());
};

export const postDoc = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

export const updateDoc = (url, id, body) => {
  return fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const deleteDoc = (url, id) => {
  return fetch(url + id, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const iconDimensions = { width: "40px", height: "40px" };

// Fluid CSS
export const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;
