import { Suspense, useMemo } from "react";
import { Props } from "src/models/props.type";
import Skeleton from "./skeleton";

export type LazyImageProps = {
  src: string;
  alt: string;
} & Props;

const createImageResource = (src: string) => {
  let status = "pending";
  let result: string | Event;

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      status = "success";
      result = src;
      resolve(src);
    };
    img.onerror = (error) => {
      status = "error";
      result = error;
      reject(error);
    };
  });

  return {
    read() {
      if (status === "pending") {
        throw promise;
      }
      if (status === "error") {
        throw result;
      }
      return result;
    },
  };
};

const ImageLoadedr = ({ src, alt, ...props }: LazyImageProps) => {
  const resource = useMemo(() => createImageResource(src), [src]);
  const imgSrc = resource.read();

  return <img src={imgSrc as string} alt={alt} {...props} />;
};

export default function LazyImage({ src, alt, ...props }: LazyImageProps) {
  return (
    <div className="aspect-square">
      <Suspense
        fallback={<Skeleton width="100%" height="100%" type="circle" />}
      >
        <ImageLoadedr
          className="w-full h-full aspect-square"
          src={src}
          alt={alt}
          {...props}
        />
      </Suspense>
    </div>
  );
}
