import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.png';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image quality={100} src={logo} alt="The Wild oasis" width='60' height='60'/>
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span> 
    </Link>
  );
}

export default Logo;
