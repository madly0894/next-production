import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

type Props = {
    children?: React.ReactNode;
    activeClassName: string;
    href: string;
    as?: string;
};

const ActiveLink: React.FC<Props> = ({ children, activeClassName, href, as }: Props): JSX.Element => {
    const { asPath } = useRouter();
    const child: any = Children.only(children);
    const childClassName: string | undefined = child.props.className || '';

    const className = asPath === href || asPath === as ? `${childClassName} ${activeClassName}`.trim() : childClassName;

    return (
        <Link href={href} as={as}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};

export default ActiveLink;
