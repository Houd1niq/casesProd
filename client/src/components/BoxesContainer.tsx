import { boxesApiSlice } from "../services/casesApi/boxesApiSlice";
import { Box } from "./Box";

export const BoxesContainer = () => {
  const { currentData: boxes } = boxesApiSlice.useGetBoxesQuery("");
  return (
    <div className="flex justify-center text-white font-sf-ui gap-7 min-h-[300px] min-w-[320px] sm:gap-1 mb-0 sm:mb-10 flex-col sm:flex-row">
      {boxes?.map((box) => (
        <Box key={box.id} box={box}></Box>
      ))}
    </div>
  );
};
