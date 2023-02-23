interface ContentPageLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const ContentPageContainer = ({ children }: ContentPageLayoutProps) => {
  return <div className='min-h-screen w-full flex-col'>{children}</div>
}
export default ContentPageContainer
