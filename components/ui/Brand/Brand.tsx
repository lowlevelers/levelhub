import mergeTW from '@/utils/mergeTW';

export default ({
  className = '',
  w = '124',
  h = '35',
}: {
  className?: string;
  w?: string;
  h?: string;
}) => (
  <div>
    <svg width={w} height={h} viewBox="0 0 558 558" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="558" height="558" fill="black" />
      <path
        d="M387.866 321.365L295.657 271.027L296.071 165.973L327.455 147.433L327.807 252.034L419.251 302.825L387.866 321.365Z"
        fill="white"
      />
      <path
        d="M243.464 398.531L221.216 371.507L383.487 283.256L406.445 311.143L243.464 398.531Z"
        fill="white"
      />
      <g filter="url(#filter0_d_2826_150)">
        <path
          d="M178.404 305.236L271.874 251.956L269.473 144.393L236.988 126L238.597 233.114L145.919 286.842L178.404 305.236Z"
          fill="white"
        />
        <path
          d="M324.918 395.629L349.339 369.384L188.935 269.098L163.736 296.181L324.918 395.629Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2826_150"
          x="108.918"
          y="93"
          width="277.422"
          height="343.629"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="18.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2826_150" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2826_150"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
);
