'use client';

import React, { useState, useEffect } from "react";
import "./product.css";

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

const getData = async (id: number) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  console.log(data);

  return data;
};

interface Product {
  id: number;
  title: string;
  price: string;
  images: string;
  description: string;

}

export default function Product({ params: { id } }: { params: { id: number } }) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData(id).then(productData => {
      setData(productData);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center">
        <img src={data?.images[0]} alt="" />
      <div className="parent">
            <p>Sahifani obnovit qivorin card bittada kirganda ciqmayapti</p>
        <div className="card">
          <div className="content-box">
            <span className="card-title">
              {data?.title}
            </span>
            <p className="card-content">
              {data?.description}
            </p>
            <span className="see-more">${data?.price}</span>
          </div>
          <div className="date-box">
            <span className="month">Май</span>
            <span className="date">23</span>
          </div>
        </div>
      </div>
    </div>
  );
}
