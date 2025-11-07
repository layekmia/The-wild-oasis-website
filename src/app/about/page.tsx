import Counter from "../../components/Counter";


export const metadata = {
  title: "About",
  description: "About page description",
};

export default async function Page() {

  return (
    <div>About  Page
      <Counter/>
    </div>
  )
}