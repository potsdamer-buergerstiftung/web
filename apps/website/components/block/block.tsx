import clsx from "clsx";
import Image from "./image";
import Paragraph from "./paragraph";
import { ConfigProp, RenderersProp } from "./render";

export interface Block {
  id?: string;
  type: string;
  data: Record<string, any>;
}

export interface DataProp {
  time: number;
  version: string;
  blocks: Block[];
}

const Blocks = ({
  data,
  config = {},
  renderers = {},
  loading = false,
}: {
  data: DataProp;
  config?: ConfigProp;
  renderers?: RenderersProp;
  loading?: boolean;
}) => {
  const defaultRenderers = {
    paragraph: Paragraph,
    image: Image,
  };

  const availableRenderers = {
    ...defaultRenderers,
    ...renderers,
  };

  const hasBlockId = true;

  if (loading) {
    const i = Array.from({ length: 10 }).fill(0);
    return (
      <div>
        {i.map((_, i) => {
          const rand = Math.floor(Math.random() * (100 - 80 + 1) + 80);
          return (
            <div
              key={i}
              className={clsx("h-4 animate-pulse bg-slate-100 mb-4")}
              style={{ width: `${rand}%` }}
            ></div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {data.blocks.map((block, i) => {
        if (block.type.toString() in availableRenderers) {
          // @ts-ignore Todo: find a fix
          const Tag = availableRenderers[block.type];
          return (
            <Tag
              key={hasBlockId && block.id ? block.id : i}
              data={block.data}
              {...config[block.type]}
            />
          );
        }
      })}
    </>
  );
};

export default Blocks;
