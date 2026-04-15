"use client";

import Back from "@/modules/common/icons/back";
import FastDelivery from "@/modules/common/icons/fast-delivery";
import Refresh from "@/modules/common/icons/refresh";

import Accordion from "./accordion";
import { HttpTypes } from "@medusajs/types";

type ProductTabsProps = {
  product: HttpTypes.StoreProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Produktinformationen",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Versand & Rückgabe",
      component: <ShippingInfoTab />,
    },
  ];

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="py-8 text-sm leading-7 text-foreground/75">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Herkunftsland</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Typ</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Gewicht</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Abmessungen</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingInfoTab = () => {
  return (
    <div className="py-8 text-sm leading-7 text-foreground/75">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-3">
          <FastDelivery />
          <div>
            <span className="font-semibold">Schnelle Lieferung</span>
            <p className="max-w-sm">
              Ihr Paket kommt in 3-5 Werktagen an Ihre Abholstelle oder direkt
              zu Ihnen nach Hause.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Refresh />
          <div>
            <span className="font-semibold">Einfache Umtausche</span>
            <p className="max-w-sm">
              Passt es nicht ganz? Kein Problem - wir tauschen Ihr Produkt gern
              gegen ein neues aus.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Back />
          <div>
            <span className="font-semibold">Einfache Rückgaben</span>
            <p className="max-w-sm">
              Senden Sie das Produkt einfach zurück und wir erstatten Ihnen den
              Betrag. Ohne Rückfragen - wir sorgen dafür, dass Ihre Rückgabe
              unkompliziert verläuft.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
