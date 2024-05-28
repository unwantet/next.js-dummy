import Link from "next/link";
import "./card.css";

const getData = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data;
};

interface Product {
  id: number;
  title: string;
  price: string;
  images: string;
  description: string;
}

async function Home() {
  const data = await getData();

  return (
    <div className="grid md:grid-cols-3   sm:grid-cols-2 sm:px-5 grid-cols justify-center gap-5 ">
      {data.products.map((product: Product) => (
          <Link href={`/product/${product.id}`}>
          <div
            className="card"
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            >
            <img src={product.images[0]} alt="" />
            <div className="card__content">
              <p className="card__title">{product.title}</p>
              <p className="card__description line-clamp-3">
                {product.description}
              </p>
              <p>${product.price}</p>
            </div>
          </div>
      </Link>
      ))}
    </div>
  );
}
export default Home;
