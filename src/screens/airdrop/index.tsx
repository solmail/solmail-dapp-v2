import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  chakra,
  Container,
  Flex,
  SkeletonText,
} from "@chakra-ui/react";
import { ClaimCard } from "@components/ClaimCard";
import { useGetAirdrop } from "@hooks/useGetAirdrop";

import { usePinataFile } from "@hooks/usePinataFile";
import { PageNotFound } from "@screens/404";
import { Link, useParams } from "@tanstack/react-router";

export const Airdrop: React.FC = () => {
  const { id } = useParams({ from: `/u/_layout/solmail/airdrop/d/$id` });
  const { data: airdrop, loading } = useGetAirdrop(id);

  const { data: message, isLoading } = usePinataFile(airdrop?.message ?? "");

  return (
    <Container w="full" py={3}>
      {!loading && airdrop && (
        <>
          <Flex w="full" justifyContent={"space-between"} mb={3}>
            <Flex direction={"column"}>
              <Flex>
                <chakra.span fontWeight={"bold"} fontSize={18}>
                  {airdrop?.name}
                </chakra.span>
              </Flex>
              <Flex>
                <Breadcrumb fontSize={13}>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/u/solmail/airdrops">
                      Airdrops
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{airdrop?.name ?? ""}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            border="solid 1px"
            borderColor={"surface.900"}
            borderLeft={"none"}
            borderRight={"none"}
          >
            <ClaimCard />
          </Flex>
          {!isLoading && (
            <Flex my={3} opacity={0.5}>
              <Box
                w="full"
                color={"white"}
                sx={{
                  ol: {
                    ml: 5,
                  },
                }}
              >
                <Box
                  dangerouslySetInnerHTML={{
                    __html: message ?? "",
                  }}
                ></Box>
              </Box>
            </Flex>
          )}

          {isLoading && (
            <Flex>
              <SkeletonText noOfLines={5} w="100%" height={300} isLoaded={!1} />
            </Flex>
          )}
        </>
      )}

      {!loading && !airdrop && <PageNotFound />}
    </Container>
  );
};
