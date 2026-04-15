import ApplePayButton from "apple-pay-button";

export function ApplePayOption() {
  const onClick = () => {};

  return (
    <ApplePayButton
      onClick={onClick}
      style={{ width: "100%", borderRadius: "10px", height: "40px" }}
      type="donate"
    />
  );
}
