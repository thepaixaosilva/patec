"use client"
import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react"
import { createRecipeContext } from "@chakra-ui/react"
import Link from "next/link"
import { ComponentProps } from "react"

export interface LinkButtonProps
  extends HTMLChakraProps<typeof Link, RecipeProps<"button">> {}

const { withContext } = createRecipeContext({ key: "button" })

export const LinkButton = withContext<ComponentProps<typeof Link>, LinkButtonProps>(Link)
