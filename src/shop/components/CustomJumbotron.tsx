interface Props {
  title: string;
  subTitle?: string;
}

export const CustomJumbotron = ({ title, subTitle }: Props) => {
  const defaultSubTitle =
    "Ropa minima y elegante inspirada en el diseño futurista y tradicional. Calidad premium para un estilo atemporal.";

  return (
    <section className="py-16 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto text-center">
        <h1 className="font-montserrat text-5xl lg:text-7xl tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {subTitle || defaultSubTitle}
        </p>
      </div>
    </section>
  );
};
