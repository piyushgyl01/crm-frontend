export default function Header({ heading }) {
  return (
    <>
      <header>
        <div className="py-5">
            <h1 className="text-center display-3">{heading}</h1>
        </div>
      </header>
    </>
  );
}
