import { useLocation } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  console.log("state", state);

  return (
    <>
      <div>Payment page with </div>
      <pre>{JSON.stringify(state)}</pre>
    </>
  );
};

export default Payment;
