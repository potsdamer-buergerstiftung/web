import { Badge } from "@/components/ui/badge";

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge variant="outline" className={className}>
      <span className="font-semibold">Attention:</span> For testing purposes
      only.
    </Badge>
  );
};

export default PaymentTest;
