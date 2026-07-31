import { Link } from 'react-router-dom';
import { getProductBuyTarget, ProductBuyInfo } from '../utils/productBuy';

interface BuyPluginButtonProps {
  product: ProductBuyInfo;
  className?: string;
  children?: React.ReactNode;
}

export default function BuyPluginButton({
  product,
  className = 'btn-primary mt-8 inline-block text-center',
  children = 'Get Plugin',
}: BuyPluginButtonProps) {
  const target = getProductBuyTarget(product);

  if (target.type === 'external') {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={target.href} className={className}>
      {children}
    </Link>
  );
}
