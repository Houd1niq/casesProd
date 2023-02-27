import { boxesApiSlice } from "../services/casesApi/boxesApiSlice";
import { Box } from "./Box";

export const BoxesContainer = () => {
  const { currentData: boxes } = boxesApiSlice.useGetBoxesQuery("");
  return (
    <div className="flex justify-center text-white font-sf-ui gap-7">
      {boxes?.map((box) => (
        <Box key={box.id} box={box}></Box>
      ))}
    </div>
  );
};
