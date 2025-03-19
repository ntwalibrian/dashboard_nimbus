// export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-50 bg-amber-300">
    //     {/* <SideNav /> */}
    //   </div>
    //   <div className="flex-grow md:overflow-y-auto">
    //     {children}
    // </div>
    // </div>
    <div className="flex h-screen w-full ">
      <div className="w-45">sidenav</div>
      <div className="flex-grow flex-col">
        <div className="w-full">navbar</div>
        <div className="flex-grow md:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
