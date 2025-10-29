import { type FC } from "react";

// Define the interface for the component's props
interface CategoryProps {
  name: string;
}

export const Category: FC<CategoryProps> = ({ name }) => {
  return (
    <div>
      <p>Category Name: {name}</p>
    </div>
  );
};
