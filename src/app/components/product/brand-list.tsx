import clsx from "clsx";

export default function BrandList({
  brands,
  onBrandClick,
  onAllBrandOptionClick,
  selectedBrand
}: {
  brands: [],
  onBrandClick: (brand: any) => void,
  onAllBrandOptionClick: () => void,
  selectedBrand: number | undefined
}) {

  return (
    <div className="flex flex-wrap gap-4 my-4">

      {brands?.length > 0 && (
        <button
        onClick={() => onAllBrandOptionClick()}
        className={clsx(
          'brand border py-2 px-6 focus:outline-none rounded transition-colors duration-300 ease-in-out',
          selectedBrand == 0 ? 'bg-[#cb202d] border-[#cb202d]' : 'border-gray-300'
        )}
      >
        <span
          className={clsx(
            'block text-center text-sm font-semibold transition-colors duration-300 ease-in-out',
            selectedBrand == 0 ? 'text-white' : 'text-gray-900'
          )}
        >
          {'All'}
        </span>
      </button>
      )}

      {brands.map((brand: any, index) => (
        <BrandButton
          brand={brand}
          key={brand?.id}
          onBrandClick={(brand) => onBrandClick(brand)}
          selectedBrand={selectedBrand}
        />
      ))}
    </div>
  )
}

function BrandButton({
  brand,
  onBrandClick,
  selectedBrand
}: {
  brand: any,
  onBrandClick: (brand: any) => void,
  selectedBrand: number | undefined
}) {
  return (
    <button
      onClick={() => onBrandClick(brand)}
      className={clsx(
        'brand border py-2 px-6 focus:outline-none rounded transition-colors duration-300 ease-in-out',
        selectedBrand == brand.id ? 'bg-[#cb202d] border-[#cb202d]' : 'border-gray-300'
      )}
    >
      <span
        className={clsx(
          'block text-center text-sm font-semibold transition-colors duration-300 ease-in-out',
          selectedBrand == brand.id ? 'text-white' : 'text-gray-900'
        )}
      >
        {brand?.name}
      </span>
    </button>
  );
}
