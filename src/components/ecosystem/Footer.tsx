import { BottomNavigation } from "@mui/material";

const Footer = () => {
  return (
    <>
      <div>
        <ul>
          <li key={"purchase"}>
            <Link href="/purchase">買取受付</Link>
          </li>
          <li key={"inquiry"}>
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
        <div>
          <Link href="https://bit.ly/3upDsNH">
            <Image
              src="/images/FacebookLogo.png"
              alt="FBLogo"
              width={30}
              height={30}
            />
          </Link>
          <Link href="https://www.instagram.com/rakus_partners/?hl=ja">
            <Image
              src="/images/InstagramLogo.png"
              alt="InstLogo"
              width={30}
              height={30}
            />
          </Link>
          <Link href="https://twitter.com/hr_rakus">
            <Image
              src="/images/TwitterLogo.png"
              alt="TwLogo"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
      <div>
        <h3>- 運営会社 -</h3>
        <p>
          株式会社JORDANS
          <br />
          〒160-0022 <br />
          東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階
          <br />
          MAIL : jordans@rakus-partners.co.jp
          <br />
        </p>
      </div>
    </>
  );
};
