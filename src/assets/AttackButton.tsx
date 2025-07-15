import glovIcon from "./glovIcon.svg"; 

export const AttackButton = ({
  size = 80,
  ...props
}: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={size}
    height={size}
    {...props}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect
      x="1.28711"
      y="1.28711"
      width="53.4258"
      height="53.4258"
      rx="26.7129"
      fill="url(#pattern0_6337_3674)"
      stroke="black"
      strokeWidth="1.65235"
    />
    <defs>
      <pattern
        id="pattern0_6337_3674"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_6337_3674"
          transform="matrix(0.0015748 0 0 0.00165483 0.0114138 -0.01)"
        />
      </pattern>
      <image
        id="image0_6337_3674"
        width="635"
        height="634"
        preserveAspectRatio="none"
        xlinkHref={glovIcon} 
      />
    </defs>
  </svg>
);