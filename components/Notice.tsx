import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Icon from "./Icon";

const noticeContainer = cva(
  "p-4 border-t border-b lg:w-[calc(100vw-320px)] lg:ml-[calc(480px-50vw)] -mx-4 md:-mx-8",
  {
    variants: {
      variant: {
        info: "bg-green-50 border-green-300 text-green-600 [&_*]:text-green-600",
        warning:
          "bg-yellow-50 border-yellow-300 text-yellow-600 [&_*]:text-yellow-600",
        danger: "bg-red-50 border-red-300 text-red-600 [&_*]:text-red-600",
      },
    },
  },
);

type Props = {
  children: React.ReactNode;
  type: VariantProps<typeof noticeContainer>["variant"];
};

const Notice = ({ children, type }: Props) => {
  return (
    <div className={noticeContainer({ variant: type })}>
      <div className="lg:w-[640px] lg:mx-auto flex items-start">
        <div className="pt-2">
          <Icon.Info />
        </div>
        <div className="ml-2">
          <span className="uppercase text-sm font-semibold">{type}</span>
          <p className="text-base my-1">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Notice;
