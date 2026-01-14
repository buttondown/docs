import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const noticeContainer = cva("p-4 border rounded-lg text-sm max-w-prose mb-6", {
  variants: {
    variant: {
      info: "bg-green-50 border-green-300 text-green-600 **:text-green-600",
      warning:
        "bg-yellow-50 border-yellow-300 text-yellow-600 **:text-yellow-600",
      danger: "bg-red-50 border-red-300 text-red-600 **:text-red-600",
    },
  },
});

type Props = {
  children: React.ReactNode;
  type: VariantProps<typeof noticeContainer>["variant"];
};

const Notice = ({ children, type }: Props) => {
  return (
    <div className={noticeContainer({ variant: type })}>
      <div className="lg:mx-auto flex items-start">
        <div className="text-sm">
          <div className="uppercase text-xs font-semibold mb-1">{type}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Notice;
