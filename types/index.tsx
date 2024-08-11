export type ITEM = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type GROUP = ITEM & {
  subGroups: ITEM[];
};

export type GROUPS = GROUP[];

export type SubGroupRenderTypes = {
  val: ITEM;
  i: number;
  isSubGroups: boolean;
};
