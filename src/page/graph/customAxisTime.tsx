type props = {
  x: number;
  y: number;
  stroke: string;
  payload: string[];
};

export const CustomizedAxisTick = ({ x, y, stroke, payload }: props) => {
  // 시작점과, 140개 데이터마다 라벨을 표시합니다.
  let visibleTick = payload.length % 140 === 0 ? payload[0] : "";
  return (
    <g transform={`translate(${1},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {visibleTick}
      </text>
    </g>
  );
};
