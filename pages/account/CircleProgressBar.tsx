


export default function CircleProgressBar({ percentage, circleWidth, radius, strokeWidth} : any) {

  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="w-full h-full">
      <svg
        className="w-full h-full"
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          className="w-full h-full stroke-slate-50"
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
        />
        <circle
          className={`w-full h-full stroke-color-secondary`}
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="text-3xl font-bold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  )
};
