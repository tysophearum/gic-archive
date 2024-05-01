import { FacebookIcon } from "../icons/FacebookIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { TelegramIcon } from "../icons/TelegramIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { WebsiteIcon } from "../icons/WebsiteIcon";
import { Tooltip } from "@nextui-org/react";

const ContactIcon = ({type, link}) => {
  let icon = null;

  if (type.toLowerCase() === 'facebook') {
    icon = <FacebookIcon width={30} height={30} />;
  } else if (type.toLowerCase() === 'linkedin') {
    icon = <LinkedinIcon width={30} height={30} />;
  } else if (type.toLowerCase() === 'telegram') {
    icon = <TelegramIcon width={30} height={30} />;
  } else if (type.toLowerCase() === 'instagram') {
    icon = <InstagramIcon width={30} height={30} />;
  } else {
    icon = <WebsiteIcon width={30} height={30} />;
  }
  
  return (
    <Tooltip content={link}>
      <a className="px-2" href={link.startsWith('https://') ? link : 'https://' + link} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </Tooltip>
  );
}

export default ContactIcon