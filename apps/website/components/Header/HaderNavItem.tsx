"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Children,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  headerBackgroundHeight,
  headerExpanded,
  mobileMenuOpen,
} from "./state";

interface HeaderNavItemProps {
  children?: React.ReactNode;
  label: string;
  index?: number;
  href?: string;
}

function addZero(index: string): string {
  const number = Number(index);
  return number < 10 ? `0${index}` : index.toString();
}

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({
  label,
  href,
  children,
  index,
}) => {
  const pathname = usePathname();
  const [itemSubMenuOpen, setItemSubMenuOpen] = useState(false);
  const subNavRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const reactId = useId();
  const subNavId = useMemo(
    () => `header-subnav-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId],
  );
  const [backgroundHeight, setBackgroundHeight] = useAtom(
    headerBackgroundHeight,
  );
  const [expanded, setExpanded] = useAtom(headerExpanded);
  const [isMobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpen);

  const subNavItemCount = children ? Children.count(children) : 0;
  const childHrefs = useMemo(() => {
    function collectHrefs(node: React.ReactNode): string[] {
      if (!node) {
        return [];
      }

      return Children.toArray(node).flatMap((child) => {
        if (!isValidElement(child)) {
          return [];
        }

        const childProps = child.props as {
          href?: string;
          children?: React.ReactNode;
        };
        const hrefs = childProps.href ? [childProps.href] : [];
        return hrefs.concat(collectHrefs(childProps.children));
      });
    }

    return collectHrefs(children);
  }, [children]);

  const isActive = useMemo(() => {
    if (!pathname) {
      return false;
    }

    if (href && pathname.startsWith(href)) {
      return true;
    }

    return childHrefs.some((childHref) => pathname.startsWith(childHref));
  }, [childHrefs, href, pathname]);

  const anchorClass = clsx(
    "group flex flex-row justify-start gap-1 rounded-md px-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:flex-col lg:gap-0 lg:px-3 lg:py-2",
  );

  const openSubNav = useCallback(() => {
    if (!children) {
      return;
    }

    setBackgroundHeight(subNavItemCount * 2.2 + 10);
    setExpanded(true);
    setItemSubMenuOpen(true);
  }, [children, setBackgroundHeight, setExpanded, subNavItemCount]);

  const closeSubNav = useCallback(() => {
    if (!children) {
      return;
    }

    setExpanded(false);
    setItemSubMenuOpen(false);
  }, [children, setExpanded]);

  const toggleSubNav = useCallback(() => {
    if (!children) {
      return;
    }

    if (itemSubMenuOpen) {
      closeSubNav();
    } else {
      openSubNav();
    }
  }, [children, closeSubNav, itemSubMenuOpen, openSubNav]);

  const focusFirstSubNavItem = useCallback(() => {
    const first = subNavRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }, []);

  const focusLastSubNavItem = useCallback(() => {
    const focusable = subNavRef.current?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) {
      return;
    }
    focusable[focusable.length - 1]?.focus();
  }, []);

  function onMouseEnter() {
    if (children) {
      openSubNav();
    }
  }

  function onMouseLeave() {
    if (children) {
      closeSubNav();
    }
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (!children) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSubNav();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      openSubNav();
      requestAnimationFrame(() => focusFirstSubNavItem());
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      openSubNav();
      requestAnimationFrame(() => focusLastSubNavItem());
      return;
    }

    if (e.key === "Escape") {
      if (itemSubMenuOpen) {
        e.preventDefault();
        closeSubNav();
        triggerRef.current?.focus();
      }
    }
  }

  function onWrapperKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Escape") {
      return;
    }

    if (children && itemSubMenuOpen) {
      e.preventDefault();
      e.stopPropagation();
      closeSubNav();
      triggerRef.current?.focus();
    }
  }

  function onWrapperBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!children) {
      return;
    }

    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) {
      return;
    }

    closeSubNav();
  }

  function onTopLevelLinkClick() {
    setMobileMenuOpen(false);
    setExpanded(false);
  }

  return (
    <div
      className="group relative flex flex-col justify-start"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onWrapperBlur}
      onKeyDown={onWrapperKeyDown}
    >
      {href ? (
        <Link
          href={href}
          className={anchorClass}
          aria-current={isActive ? "page" : undefined}
          onClick={onTopLevelLinkClick}
          ref={triggerRef as React.Ref<HTMLAnchorElement>}
        >
          {typeof index === "number" && (
            <span
              className={clsx(
                "text-xs font-bold leading-4 text-slate-600 transition group-hover:text-primary group-focus:text-primary",
                isActive &&
                  "text-primary lg:text-primary dark:lg:text-primary",
              )}
            >
              {addZero(index.toString())}
            </span>
          )}
          <span
            className={clsx(
              "text-2xl font-bold transition group-hover:text-primary group-focus:text-primary lg:text-[1rem] lg:font-medium lg:leading-6 lg:text-slate-900 dark:lg:text-slate-50",
              isActive ? "text-primary" : "text-slate-50",
            )}
          >
            {label}
          </span>
        </Link>
      ) : (
        <button
          type="button"
          className={anchorClass}
          aria-haspopup={children ? "true" : undefined}
          aria-expanded={children ? (expanded && itemSubMenuOpen ? true : false) : undefined}
          aria-controls={children ? subNavId : undefined}
          onClick={toggleSubNav}
          onKeyDown={onTriggerKeyDown}
          ref={triggerRef as React.Ref<HTMLButtonElement>}
        >
          {typeof index === "number" && (
            <span
              className={clsx(
                "text-xs font-bold leading-4 text-slate-600 transition group-hover:text-primary group-focus:text-primary",
                isActive &&
                  "text-primary lg:text-primary dark:lg:text-primary",
              )}
            >
              {addZero(index.toString())}
            </span>
          )}
          <span
            className={clsx(
              "text-left text-2xl font-bold transition group-hover:text-primary group-focus:text-primary lg:text-[1rem] lg:font-medium lg:leading-6 lg:text-slate-900 dark:lg:text-slate-50",
              isActive ? "text-primary" : "text-slate-50",
            )}
          >
            {label}
          </span>
        </button>
      )}
      {children && (
        <ul
          id={subNavId}
          ref={subNavRef}
          className={clsx(
            "relative mb-4 w-auto flex flex-col whitespace-nowrap px-9 lg:absolute lg:mb-0 lg:px-3 lg:py-20",
            expanded && itemSubMenuOpen ? "flex" : "hidden",
          )}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

export default HeaderNavItem;
