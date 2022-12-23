interface IconProps {
  link: string;
  image: string;
  className: string;
}

export function Icon(props: IconProps) {
  return (
    <li>
      <a href={props.link} className="footerLink">
        <img src={props.image} alt={props.image} className={props.className} />
      </a>
    </li>
  );
}
