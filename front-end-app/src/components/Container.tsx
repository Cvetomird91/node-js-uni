import React from 'react'

type ContainerProps = {
    children: React.ReactNode;
};

export function Container (props: ContainerProps) {
  return (
    <div className="container">
        {props.children}
    </div>
  )
}
