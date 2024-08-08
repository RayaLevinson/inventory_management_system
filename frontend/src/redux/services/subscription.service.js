let func = () => {
  console.log("Default function. Nothing subscribed.");
};

const SubscriptionService = {
  call: (res) => {
    console.log("SubscriptionService.call invoked with:", res);
    func(res);
  },
  unsubscribe: () => {
    console.log("SubscriptionService.unsubscribe invoked");
    func = () => {
      console.log("Default function. Nothing subscribed.");
    };
  },
  subscribe: (fn) => {
    console.log("SubscriptionService.subscribe invoked with function:", fn);
    func = fn;
  },
};

export default SubscriptionService;
