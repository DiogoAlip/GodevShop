import { useProduct } from "@/shop/hooks/useProduct";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";

export const ProductPage = () => {
  const navigate = useNavigate();
  const { idSlug } = useParams();
  const { data: product, isLoading, isError } = useProduct(idSlug!);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) return <CustomFullScreenLoading />;
  if (isError || !product) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-muted-foreground">
          Producto no encontrado
        </h2>
        <Button onClick={() => navigate(-1)}>Volver atrás</Button>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const onHandleToggleSize = (size: string) => {
    if (size === selectedSize) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  return (
    <>
      <nav className="ml-10 mt-10 flex text-sm font-medium text-muted-foreground z-10 fixed top-18">
        <div
          className="flex items-center justify-center cursor-pointer rounded-full text-white/80 bg-black/80 h-12 w-12 hover/text-white hover:bg-black"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-1 h-6 w-6" />
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 z-0">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-16">
          {/* Left Side: Images */}
          <div className="flex flex-col space-y-6">
            <div className="group relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-sm transition-all hover:shadow-md">
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-0"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 transition-all hover:scale-110 active:scale-95 text-foreground lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-all hover:scale-110 active:scale-95 text-foreground lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <ChevronRight size={40} />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2 lg:hidden">
                {product.images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === activeImageIndex ? "bg-primary w-4" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all hover:opacity-80 ${
                      activeImageIndex === index
                        ? "border-primary ring-2 ring-primary/10"
                        : "border-transparent bg-muted/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col">
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {product.gender}
                </span>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= 4 ? "fill-current" : ""}`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    4.8 (124)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {product.title}
              </h1>

              <div className="flex items-baseline space-x-4">
                <p className="text-3xl font-bold text-primary">
                  ${product.price}
                </p>
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="text-sm font-semibold text-destructive animate-pulse">
                    ¡Solo quedan {product.stock} unidades!
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Selection Area */}
            <div className="flex-1 space-y-8">
              {/* Size Selection */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Talla seleccionada:{" "}
                    <span className="text-foreground">
                      {selectedSize || "Ninguna"}
                    </span>
                  </label>
                  <button className="text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                    Guía de tallas
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => onHandleToggleSize(size)}
                      className={`flex h-12 items-center justify-center rounded-xl border-2 font-bold transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-primary-foreground shadow-lg shadow-primary/20"
                          : "border-gray-400 bg-white text-gray-400 hover:border-black/80 hover:text-black/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                  <div className="flex items-center justify-between rounded-2xl bg-muted p-1">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-background disabled:opacity-30"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="w-14 text-center text-lg font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-background disabled:opacity-30"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex flex-1 space-x-3">
                    <Button
                      size="lg"
                      className="h-14 flex-1 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] bg-black hover:bg-black/80 disabled:bg-muted/50 disabled:text-muted-foreground disabled:shadow-none"
                      disabled={!selectedSize || product.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-6 w-6" />
                      {product.stock === 0 ? "Agotado" : "Añadir al carrito"}
                    </Button>
                    <button className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-muted transition-colors hover:border-red-500 hover:bg-red-50 group">
                      <Heart className="h-6 w-6 text-muted-foreground transition-colors group-hover:fill-red-500 group-hover:text-red-500" />
                    </button>
                    <button className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-muted transition-colors hover:border-primary hover:bg-primary/5 group">
                      <Share2 className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            {/* Description & Benefits */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Descripción del producto</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center space-x-3 rounded-2xl border bg-muted/30 p-4">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-sm font-semibold">Envío gratis</span>
                </div>
                <div className="flex items-center space-x-3 rounded-2xl border bg-muted/30 p-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="text-sm font-semibold">2 años garantía</span>
                </div>
                <div className="flex items-center space-x-3 rounded-2xl border bg-muted/30 p-4">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <span className="text-sm font-semibold">30 días retorno</span>
                </div>
              </div>

              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
