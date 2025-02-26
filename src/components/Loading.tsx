import React, { memo } from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  minHeight?: string
}

const Loading: React.FC<LoadingProps> = memo(({ 
  size = 'md',
  minHeight = '200px'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  }

  return (
    <div className={`min-h-[${minHeight}] flex items-center justify-center`}>
      <div 
        className={`${sizeMap[size]} border-primary border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
})

Loading.displayName = 'Loading'

export default Loading 