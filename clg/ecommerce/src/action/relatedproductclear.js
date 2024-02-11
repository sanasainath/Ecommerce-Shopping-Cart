// action/relatedproductclear.js

import { clearRelatedProducts } from "./constants";

export const clearProduct = () => {
  console.log("Clearing related products..................ppppppppppppppppp"); // Add this line for logging
  return {
    type: clearRelatedProducts.CLEAR_RELATED_PRODUCTS,
  };
};
