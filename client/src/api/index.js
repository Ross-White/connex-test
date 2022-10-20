
const getTime = async () => {
  try {
    const res = await fetch("/time", {
      method: "GET", 
      headers: {
        authorization: "mysecrettoken",
      },
    });
    return res.json();
  } catch (error) {
    return null;
  }
};

export { getTime };