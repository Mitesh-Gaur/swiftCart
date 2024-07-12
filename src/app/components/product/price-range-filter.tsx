import { useEffect, useState } from "react";

export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceChange
}: {
  minPrice: number,
  maxPrice: number,
  onPriceChange: (min: number, max: number) => void
}) {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  useEffect(() => {
    onPriceChange(min, max);
  }, [min, max])

  return (
    <>
    <div className="flex items-center">
      <div>
        <label>
          Min Price:
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value))}
            className="border p-2 rounded w-[50%] ml-2"
          />
        </label>
      </div>

      <div>
        <label>
          Max Price:
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value))}
            className="border p-2 rounded w-[50%] ml-2"
          />
        </label>
      </div>
    </div>
    </>
  );
}
