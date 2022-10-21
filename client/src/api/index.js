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

const getMetrics = async () => {
  try {
    const metrics = await fetch("/metrics", {
      method: "GET",
      headers: {
        authorization: "mysecrettoken",
      },
    });
    // Unsure of the best way to retrieve the metrics in a format that can be used in the client.
    console.log(metrics)
  } catch (error) {
    return null;
  }
};

export { getTime, getMetrics };
