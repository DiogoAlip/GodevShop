export const AdminTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">
        {subtitle ?? "Here's what's happening with your business today."}
      </p>
    </div>
  );
};
