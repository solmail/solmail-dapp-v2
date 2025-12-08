/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solmail.json`.
 */
export type Solmail = {
  "address": "5VNBFr2dJTUy3eDwMdSoTb37jzmcpoAL4WH27fcAh98t",
  "metadata": {
    "name": "solmail",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Decentralized email with NFT tokenization"
  },
  "instructions": [
    {
      "name": "adminMigrateToCompressed",
      "discriminator": [
        164,
        159,
        8,
        90,
        234,
        14,
        170,
        80
      ],
      "accounts": [
        {
          "name": "mailAccountV2",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  108,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "mail_account_v2.authority",
                "account": "solMailAccountV2"
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        },
        {
          "name": "addressTreeInfo",
          "type": {
            "defined": {
              "name": "packedAddressTreeInfo"
            }
          }
        },
        {
          "name": "outputMerkleTreeIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "broadcastMessage",
      "discriminator": [
        253,
        144,
        203,
        42,
        219,
        122,
        147,
        97
      ],
      "accounts": [
        {
          "name": "sender",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "messageType",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "metadata",
          "type": "string"
        }
      ]
    },
    {
      "name": "cancelSolBid",
      "discriminator": [
        95,
        87,
        55,
        4,
        23,
        162,
        228,
        160
      ],
      "accounts": [
        {
          "name": "bidAccount"
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "userBid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "bidder"
              },
              {
                "kind": "account",
                "path": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "bidder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "claimSolRefund",
      "docs": [
        "Claim refund for non-winning SOL bidders"
      ],
      "discriminator": [
        79,
        83,
        6,
        173,
        51,
        174,
        186,
        93
      ],
      "accounts": [
        {
          "name": "bidAccount"
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "userBid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "claimer"
              },
              {
                "kind": "account",
                "path": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "claimer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "claimUsernameFromSolBid",
      "docs": [
        "Claim username after winning a SOL bid - NO RATE LIMITING as requested"
      ],
      "discriminator": [
        136,
        118,
        43,
        141,
        107,
        8,
        33,
        116
      ],
      "accounts": [
        {
          "name": "bidAccount",
          "writable": true
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "bid_account.username",
                "account": "bidAccount"
              },
              {
                "kind": "account",
                "path": "bid_account.domain",
                "account": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "userBid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "winner"
              },
              {
                "kind": "account",
                "path": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "winner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "compressedMarkMailAsPayment",
      "docs": [
        "Mark a mail as payment"
      ],
      "discriminator": [
        216,
        44,
        181,
        65,
        97,
        205,
        224,
        145
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "currentMailData",
          "type": {
            "defined": {
              "name": "compressedMailData"
            }
          }
        },
        {
          "name": "accountMeta",
          "type": {
            "defined": {
              "name": "compressedAccountMeta"
            }
          }
        },
        {
          "name": "address",
          "type": "pubkey"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        }
      ]
    },
    {
      "name": "compressedRegister",
      "discriminator": [
        128,
        103,
        157,
        89,
        239,
        184,
        75,
        117
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "feePayer",
          "docs": [
            "The master wallet that pays for all rent costs",
            "This must be the fee payer in the transaction"
          ],
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        },
        {
          "name": "addressTreeInfo",
          "type": {
            "defined": {
              "name": "packedAddressTreeInfo"
            }
          }
        },
        {
          "name": "outputMerkleTreeIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "compressedSendMail",
      "docs": [
        "Send a new mail (replaces create_mail_v2/v3)"
      ],
      "discriminator": [
        151,
        23,
        168,
        141,
        198,
        232,
        208,
        168
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "mailId",
          "type": "string"
        },
        {
          "name": "parentId",
          "type": "string"
        },
        {
          "name": "to",
          "type": "pubkey"
        },
        {
          "name": "mailbox",
          "type": "pubkey"
        },
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "body",
          "type": "string"
        },
        {
          "name": "iv",
          "type": "string"
        },
        {
          "name": "salt",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        },
        {
          "name": "addressTreeInfo",
          "type": {
            "defined": {
              "name": "packedAddressTreeInfo"
            }
          }
        },
        {
          "name": "outputMerkleTreeIndex",
          "type": "u8"
        }
      ]
    },
    {
      "name": "compressedUpdateMail",
      "docs": [
        "Update mail"
      ],
      "discriminator": [
        241,
        203,
        63,
        25,
        54,
        91,
        221,
        64
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "currentMailData",
          "type": {
            "defined": {
              "name": "compressedMailData"
            }
          }
        },
        {
          "name": "accountMeta",
          "type": {
            "defined": {
              "name": "compressedAccountMeta"
            }
          }
        },
        {
          "name": "newBody",
          "type": "string"
        },
        {
          "name": "newLabel",
          "type": {
            "defined": {
              "name": "mailLabel"
            }
          }
        },
        {
          "name": "address",
          "type": "pubkey"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        }
      ]
    },
    {
      "name": "compressedUpdateMailLabel",
      "docs": [
        "Update mail label (inbox, sent, trash, etc.)"
      ],
      "discriminator": [
        210,
        156,
        154,
        178,
        173,
        13,
        0,
        140
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "currentMailData",
          "type": {
            "defined": {
              "name": "compressedMailData"
            }
          }
        },
        {
          "name": "accountMeta",
          "type": {
            "defined": {
              "name": "compressedAccountMeta"
            }
          }
        },
        {
          "name": "newLabel",
          "type": {
            "defined": {
              "name": "mailLabel"
            }
          }
        },
        {
          "name": "address",
          "type": "pubkey"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        }
      ]
    },
    {
      "name": "compressedUpdateMailbox",
      "discriminator": [
        81,
        17,
        28,
        78,
        144,
        7,
        243,
        195
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "currentAccountData",
          "type": {
            "defined": {
              "name": "compressedSolMailAccountData"
            }
          }
        },
        {
          "name": "accountMeta",
          "type": {
            "defined": {
              "name": "compressedAccountMeta"
            }
          }
        },
        {
          "name": "newMailbox",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "address",
          "type": "pubkey"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        }
      ]
    },
    {
      "name": "compressedUpdatePaymentMail",
      "docs": [
        "Update payment mail"
      ],
      "discriminator": [
        246,
        179,
        121,
        218,
        159,
        183,
        101,
        78
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "currentMailData",
          "type": {
            "defined": {
              "name": "compressedMailData"
            }
          }
        },
        {
          "name": "accountMeta",
          "type": {
            "defined": {
              "name": "compressedAccountMeta"
            }
          }
        },
        {
          "name": "newBody",
          "type": "string"
        },
        {
          "name": "newLabel",
          "type": {
            "defined": {
              "name": "mailLabel"
            }
          }
        },
        {
          "name": "address",
          "type": "pubkey"
        },
        {
          "name": "proof",
          "type": {
            "defined": {
              "name": "validityProof"
            }
          }
        }
      ]
    },
    {
      "name": "createCollectionMasterEdition",
      "docs": [
        "Create collection master edition"
      ],
      "discriminator": [
        154,
        111,
        109,
        77,
        5,
        124,
        194,
        238
      ],
      "accounts": [
        {
          "name": "centralState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "collectionMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "docs": [
            "Marketplace settings to verify authority"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "masterEdition",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createCollectionMetadata",
      "docs": [
        "Create collection metadata"
      ],
      "discriminator": [
        246,
        165,
        159,
        126,
        15,
        178,
        235,
        83
      ],
      "accounts": [
        {
          "name": "centralState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "collectionMint",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "docs": [
            "Marketplace settings to verify authority"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createMarketplaceSettings",
      "docs": [
        "Create or initialize enhanced marketplace settings (admin only)"
      ],
      "discriminator": [
        174,
        138,
        103,
        248,
        14,
        225,
        33,
        204
      ],
      "accounts": [
        {
          "name": "marketplaceSettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "paymentEnabled",
          "type": "bool"
        },
        {
          "name": "minBidLamports",
          "type": "u64"
        },
        {
          "name": "minBidTokens",
          "type": "u64"
        },
        {
          "name": "bidDurationSecs",
          "type": "u32"
        },
        {
          "name": "solFeeLamports",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "mailFeeTokens",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minBidIncreasePercentage",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "maxUsernamesPerWindow",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "rateLimitWindowSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "minCreationIntervalSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "cancellationGracePeriodSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "refundGracePeriodSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "maxBidAmountLamports",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "maxBidAmountTokens",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "isPaused",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "minUsernameLength",
          "type": {
            "option": "u8"
          }
        },
        {
          "name": "maxUsernameLength",
          "type": {
            "option": "u8"
          }
        },
        {
          "name": "sellerFeeBasisPoints",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "ansProgramId",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "skrTldParent",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "createSolBid",
      "docs": [
        "Create a new SOL bid for a username with fixed fee collection"
      ],
      "discriminator": [
        84,
        105,
        9,
        66,
        182,
        174,
        149,
        34
      ],
      "accounts": [
        {
          "name": "bidAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "userBid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "bidder"
              },
              {
                "kind": "account",
                "path": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "bidder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "bidAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createSolmailCollection",
      "docs": [
        "Create Solmail NFT collection (one-time setup)"
      ],
      "discriminator": [
        113,
        115,
        208,
        187,
        133,
        207,
        108,
        34
      ],
      "accounts": [
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "collectionMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51
                ]
              }
            ]
          }
        },
        {
          "name": "centralStateAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "centralState"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "marketplaceSettings",
          "docs": [
            "Marketplace settings to verify authority"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createUsername",
      "docs": [
        "Create a new username account without mailbox assignment - RATE LIMITED for direct creation only"
      ],
      "discriminator": [
        166,
        69,
        156,
        133,
        149,
        194,
        61,
        190
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "rateLimit",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  116,
                  101,
                  95,
                  108,
                  105,
                  109,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "treasury",
          "docs": [
            "Treasury account to receive the 1 SOL payment"
          ],
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "createUsernameMint",
      "docs": [
        "Create NFT mint for a specific username"
      ],
      "discriminator": [
        5,
        247,
        123,
        17,
        135,
        32,
        201,
        93
      ],
      "accounts": [
        {
          "name": "centralState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "usernameAccount",
          "docs": [
            "The username account that will be wrapped"
          ]
        },
        {
          "name": "feePayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createUsernameSeeker",
      "discriminator": [
        18,
        121,
        227,
        225,
        152,
        72,
        70,
        216
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "Username owner and fee payer"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "domainOwner",
          "docs": [
            "Domain owner who authorizes username creation via .skr domain ownership"
          ],
          "signer": true
        },
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "rateLimit",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  116,
                  101,
                  95,
                  108,
                  105,
                  109,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "skrDomainAccount",
          "docs": [
            ".skr AllDomain account owned by domain_owner"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "createUsernameSeekerNew",
      "discriminator": [
        174,
        23,
        117,
        61,
        140,
        0,
        189,
        125
      ],
      "accounts": [
        {
          "name": "authority",
          "docs": [
            "Username owner and fee payer"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "domainOwner",
          "docs": [
            "Domain owner who authorizes username creation via .skr domain ownership"
          ],
          "signer": true
        },
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "rateLimit",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  116,
                  101,
                  95,
                  108,
                  105,
                  109,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "skrDomainAccount",
          "docs": [
            ".skr AllDomain account owned by domain_owner"
          ]
        },
        {
          "name": "tldHouse",
          "docs": [
            "TldHouse for .skr (needed to verify reverse lookup PDA)"
          ]
        },
        {
          "name": "tldHouseReverseLookupAccount",
          "docs": [
            "Reverse lookup account containing the domain name"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "createUsernameTemp",
      "discriminator": [
        119,
        241,
        162,
        202,
        7,
        17,
        88,
        163
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "rateLimit",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  116,
                  101,
                  95,
                  108,
                  105,
                  109,
                  105,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "feePayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "createmail",
      "docs": [
        "Create mail V2"
      ],
      "discriminator": [
        79,
        186,
        79,
        109,
        12,
        168,
        250,
        107
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true,
          "signer": true
        },
        {
          "name": "mailAccountV2"
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "from",
          "type": "pubkey"
        },
        {
          "name": "to",
          "type": "pubkey"
        },
        {
          "name": "salt",
          "type": "string"
        },
        {
          "name": "iv",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "parentId",
          "type": "string"
        }
      ]
    },
    {
      "name": "createmailV3",
      "docs": [
        "Create mail V3 - Optimized with smaller space requirements"
      ],
      "discriminator": [
        43,
        112,
        87,
        226,
        191,
        232,
        163,
        178
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true,
          "signer": true
        },
        {
          "name": "mailAccountV2"
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "from",
          "type": "pubkey"
        },
        {
          "name": "to",
          "type": "pubkey"
        },
        {
          "name": "salt",
          "type": "string"
        },
        {
          "name": "iv",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "parentId",
          "type": "string"
        }
      ]
    },
    {
      "name": "editWrappedUsername",
      "docs": [
        "Allow NFT holder to modify wrapped username data"
      ],
      "discriminator": [
        142,
        86,
        16,
        71,
        205,
        186,
        149,
        153
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "nftAccount"
        },
        {
          "name": "nftOwner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newMailbox",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "initializeSolTreasury",
      "docs": [
        "Initialize marketplace treasury for SOL payments (admin only)"
      ],
      "discriminator": [
        195,
        26,
        174,
        10,
        130,
        208,
        16,
        131
      ],
      "accounts": [
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "linkCompressedMailboxToUsername",
      "discriminator": [
        213,
        204,
        137,
        220,
        159,
        150,
        230,
        225
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "mailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "linkMailboxToUsername",
      "docs": [
        "Link a mailbox to an existing username"
      ],
      "discriminator": [
        233,
        178,
        23,
        214,
        77,
        169,
        52,
        35
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "mailAccountV2",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "mailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "linkUnlinkCompressedMailboxToUsername",
      "discriminator": [
        40,
        10,
        35,
        183,
        155,
        219,
        243,
        177
      ],
      "accounts": [
        {
          "name": "oldUsernameAccount",
          "docs": [
            "The username account to unlink the mailbox from (optional)"
          ],
          "writable": true,
          "optional": true
        },
        {
          "name": "newUsernameAccount",
          "docs": [
            "The username account to link the mailbox to"
          ],
          "writable": true
        },
        {
          "name": "authority",
          "docs": [
            "Authority that owns both username accounts"
          ],
          "signer": true
        }
      ],
      "args": [
        {
          "name": "mailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "markMailAsPayment",
      "discriminator": [
        98,
        210,
        179,
        157,
        6,
        65,
        213,
        160
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "markMailV3AsPayment",
      "docs": [
        "Mark mail V3 as payment"
      ],
      "discriminator": [
        84,
        203,
        191,
        248,
        20,
        21,
        195,
        159
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "migrateTreasuryAddBidTracking",
      "discriminator": [
        255,
        31,
        125,
        8,
        209,
        6,
        110,
        104
      ],
      "accounts": [
        {
          "name": "marketplaceTreasury",
          "docs": [
            "Treasury authority is verified to match marketplace authority in the instruction handler"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "docs": [
            "Marketplace settings account to verify admin is the authority"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "docs": [
            "Admin must be the marketplace authority (verified via marketplace_settings constraint)"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "calculatedTotalRevenue",
          "type": "u64"
        },
        {
          "name": "calculatedTotalBidAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "register",
      "docs": [
        "Register mail account V1 (legacy)"
      ],
      "discriminator": [
        211,
        124,
        67,
        15,
        211,
        194,
        178,
        240
      ],
      "accounts": [
        {
          "name": "mailAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  108,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerV2",
      "docs": [
        "Register mail account V2"
      ],
      "discriminator": [
        225,
        250,
        193,
        26,
        37,
        179,
        205,
        76
      ],
      "accounts": [
        {
          "name": "mailAccountV2",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  105,
                  108,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  118,
                  50
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "rewrapUsername",
      "docs": [
        "Re-wrap a username that was previously unwrapped"
      ],
      "discriminator": [
        142,
        184,
        154,
        88,
        103,
        179,
        176,
        223
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "nftDestination",
          "writable": true
        },
        {
          "name": "nameOwner",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "sendmail",
      "docs": [
        "Send mail V1 (legacy)"
      ],
      "discriminator": [
        254,
        11,
        16,
        48,
        131,
        123,
        30,
        181
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "body",
          "type": "string"
        },
        {
          "name": "from",
          "type": "pubkey"
        },
        {
          "name": "to",
          "type": "pubkey"
        },
        {
          "name": "salt",
          "type": "string"
        },
        {
          "name": "iv",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        }
      ]
    },
    {
      "name": "transferUsernameAuthority",
      "docs": [
        "Transfer username authority to a new owner"
      ],
      "discriminator": [
        85,
        160,
        157,
        156,
        215,
        111,
        42,
        167
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "unlinkCompressedMailboxFromUsername",
      "discriminator": [
        193,
        93,
        139,
        217,
        147,
        164,
        152,
        48
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "unlinkMailboxFromUsername",
      "docs": [
        "Unlink mailbox from username"
      ],
      "discriminator": [
        168,
        98,
        155,
        71,
        126,
        158,
        126,
        154
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "mailAccountV2",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "unwrapUsername",
      "docs": [
        "Unwrap a username NFT back to a regular username"
      ],
      "discriminator": [
        67,
        221,
        210,
        83,
        41,
        47,
        174,
        122
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "nftSource",
          "writable": true
        },
        {
          "name": "nftOwner",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateAccountV2",
      "docs": [
        "Update mail account V2"
      ],
      "discriminator": [
        207,
        128,
        25,
        128,
        97,
        131,
        11,
        255
      ],
      "accounts": [
        {
          "name": "mailAccountV2",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        },
        {
          "name": "mailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateMarketplaceSettings",
      "docs": [
        "Update existing enhanced marketplace settings(admin only)"
      ],
      "discriminator": [
        121,
        115,
        116,
        71,
        200,
        23,
        66,
        209
      ],
      "accounts": [
        {
          "name": "marketplaceSettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "paymentEnabled",
          "type": "bool"
        },
        {
          "name": "minBidLamports",
          "type": "u64"
        },
        {
          "name": "minBidTokens",
          "type": "u64"
        },
        {
          "name": "bidDurationSecs",
          "type": "u32"
        },
        {
          "name": "solFeeLamports",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "mailFeeTokens",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "minBidIncreasePercentage",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "maxUsernamesPerWindow",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "rateLimitWindowSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "minCreationIntervalSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "cancellationGracePeriodSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "refundGracePeriodSeconds",
          "type": {
            "option": "u32"
          }
        },
        {
          "name": "maxBidAmountLamports",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "maxBidAmountTokens",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "isPaused",
          "type": {
            "option": "bool"
          }
        },
        {
          "name": "minUsernameLength",
          "type": {
            "option": "u8"
          }
        },
        {
          "name": "maxUsernameLength",
          "type": {
            "option": "u8"
          }
        },
        {
          "name": "sellerFeeBasisPoints",
          "type": {
            "option": "u16"
          }
        },
        {
          "name": "ansProgramId",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "skrTldParent",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "updateSolBid",
      "docs": [
        "Update an existing SOL bid with a higher amount"
      ],
      "discriminator": [
        119,
        190,
        162,
        119,
        96,
        53,
        74,
        159
      ],
      "accounts": [
        {
          "name": "bidAccount",
          "writable": true
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "newUserBid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "newBidder"
              },
              {
                "kind": "account",
                "path": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "newBidder",
          "writable": true,
          "signer": true
        },
        {
          "name": "previousBidder",
          "writable": true,
          "optional": true
        },
        {
          "name": "previousUserBid",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "bid_account.current_highest_bidder",
                "account": "bidAccount"
              },
              {
                "kind": "account",
                "path": "bidAccount"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newBidAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updatemail",
      "docs": [
        "Update mail V2"
      ],
      "discriminator": [
        103,
        89,
        239,
        89,
        179,
        196,
        168,
        188
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "body",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatemailV3",
      "docs": [
        "Update mail V3 body"
      ],
      "discriminator": [
        189,
        63,
        60,
        8,
        49,
        97,
        122,
        73
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "body",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatemailV3Label",
      "docs": [
        "Update mail V3 label"
      ],
      "discriminator": [
        1,
        108,
        233,
        127,
        198,
        102,
        227,
        93
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "label",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatemailV3Readstatus",
      "docs": [
        "Update mail V3 read status"
      ],
      "discriminator": [
        63,
        155,
        240,
        252,
        16,
        234,
        102,
        93
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updatemaillabel",
      "docs": [
        "Update mail label"
      ],
      "discriminator": [
        127,
        96,
        27,
        207,
        164,
        210,
        203,
        16
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "label",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatemailreadstatus",
      "docs": [
        "Update mail read status"
      ],
      "discriminator": [
        22,
        58,
        187,
        161,
        225,
        237,
        130,
        155
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawSolFromTreasury",
      "docs": [
        "Withdraw SOL from marketplace treasury (admin only)"
      ],
      "discriminator": [
        54,
        251,
        139,
        174,
        186,
        22,
        181,
        143
      ],
      "accounts": [
        {
          "name": "marketplaceTreasury",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "wrapUsername",
      "docs": [
        "Wrap a username as an NFT"
      ],
      "discriminator": [
        59,
        94,
        211,
        65,
        20,
        41,
        98,
        102
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "marketplaceTreasury",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  116,
                  114,
                  101,
                  97,
                  115,
                  117,
                  114,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "marketplaceSettings",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "usernameMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "collectionMint",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51
                ]
              }
            ]
          }
        },
        {
          "name": "collectionMetadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "collectionMasterEdition",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "nftDestination",
          "writable": true
        },
        {
          "name": "nameOwner",
          "signer": true
        },
        {
          "name": "feePayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "mailboxLocked",
          "type": "bool"
        },
        {
          "name": "transferAllowed",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bidAccount",
      "discriminator": [
        27,
        161,
        15,
        114,
        230,
        126,
        56,
        104
      ]
    },
    {
      "name": "marketplaceSettings",
      "discriminator": [
        159,
        177,
        179,
        196,
        220,
        75,
        86,
        16
      ]
    },
    {
      "name": "marketplaceTreasury",
      "discriminator": [
        2,
        62,
        171,
        100,
        3,
        18,
        90,
        227
      ]
    },
    {
      "name": "solMail",
      "discriminator": [
        247,
        239,
        251,
        112,
        232,
        125,
        215,
        255
      ]
    },
    {
      "name": "solMailAccount",
      "discriminator": [
        72,
        22,
        32,
        1,
        49,
        244,
        46,
        180
      ]
    },
    {
      "name": "solMailAccountV2",
      "discriminator": [
        56,
        165,
        134,
        52,
        94,
        16,
        21,
        14
      ]
    },
    {
      "name": "solMailV2",
      "discriminator": [
        138,
        97,
        203,
        217,
        101,
        227,
        70,
        35
      ]
    },
    {
      "name": "solMailV3",
      "discriminator": [
        196,
        174,
        45,
        88,
        227,
        33,
        42,
        70
      ]
    },
    {
      "name": "solmailCentralState",
      "discriminator": [
        99,
        124,
        165,
        34,
        55,
        150,
        4,
        250
      ]
    },
    {
      "name": "userBid",
      "discriminator": [
        13,
        209,
        228,
        159,
        155,
        166,
        149,
        53
      ]
    },
    {
      "name": "userRateLimit",
      "discriminator": [
        156,
        245,
        156,
        195,
        8,
        43,
        139,
        184
      ]
    },
    {
      "name": "usernameAccount",
      "discriminator": [
        120,
        2,
        212,
        44,
        208,
        63,
        20,
        122
      ]
    },
    {
      "name": "usernameWrapper",
      "discriminator": [
        178,
        242,
        111,
        106,
        198,
        168,
        204,
        135
      ]
    }
  ],
  "events": [
    {
      "name": "accountValidationFailureEvent",
      "discriminator": [
        188,
        44,
        79,
        214,
        125,
        10,
        106,
        208
      ]
    },
    {
      "name": "adminActionEvent",
      "discriminator": [
        220,
        224,
        207,
        200,
        52,
        226,
        42,
        155
      ]
    },
    {
      "name": "bidCancelledEvent",
      "discriminator": [
        149,
        225,
        90,
        15,
        245,
        141,
        102,
        145
      ]
    },
    {
      "name": "bidCreatedEvent",
      "discriminator": [
        119,
        134,
        95,
        199,
        242,
        88,
        176,
        254
      ]
    },
    {
      "name": "bidGracePeriodEvent",
      "discriminator": [
        255,
        22,
        213,
        108,
        30,
        101,
        237,
        210
      ]
    },
    {
      "name": "bidParametersChangedEvent",
      "discriminator": [
        110,
        73,
        158,
        25,
        134,
        72,
        105,
        185
      ]
    },
    {
      "name": "bidRefundEvent",
      "discriminator": [
        2,
        119,
        161,
        92,
        202,
        2,
        244,
        28
      ]
    },
    {
      "name": "bidStatusChangeEvent",
      "discriminator": [
        245,
        13,
        92,
        176,
        132,
        250,
        64,
        253
      ]
    },
    {
      "name": "bidUpdatedEvent",
      "discriminator": [
        234,
        172,
        58,
        147,
        27,
        189,
        244,
        211
      ]
    },
    {
      "name": "broadcastMessageEvent",
      "discriminator": [
        218,
        100,
        18,
        33,
        113,
        107,
        164,
        205
      ]
    },
    {
      "name": "bulkOperationEvent",
      "discriminator": [
        40,
        21,
        147,
        124,
        13,
        126,
        189,
        43
      ]
    },
    {
      "name": "compressedMailAccountRegisterEvent",
      "discriminator": [
        223,
        153,
        231,
        225,
        14,
        41,
        202,
        28
      ]
    },
    {
      "name": "compressedMailAccountUpdateEvent",
      "discriminator": [
        184,
        51,
        19,
        156,
        131,
        40,
        5,
        73
      ]
    },
    {
      "name": "compressedMailPaymentEvent",
      "discriminator": [
        91,
        136,
        84,
        88,
        100,
        162,
        75,
        157
      ]
    },
    {
      "name": "compressedMailReadEvent",
      "discriminator": [
        189,
        140,
        195,
        98,
        148,
        220,
        159,
        241
      ]
    },
    {
      "name": "compressedMailSendEvent",
      "discriminator": [
        40,
        219,
        34,
        146,
        152,
        227,
        125,
        120
      ]
    },
    {
      "name": "compressedMailUpdateEvent",
      "discriminator": [
        88,
        177,
        48,
        249,
        25,
        8,
        88,
        85
      ]
    },
    {
      "name": "compressedMailUpdateLabelEvent",
      "discriminator": [
        196,
        189,
        141,
        221,
        9,
        35,
        98,
        87
      ]
    },
    {
      "name": "enhancedMarketplaceSettingsEvent",
      "discriminator": [
        98,
        51,
        238,
        228,
        63,
        5,
        139,
        199
      ]
    },
    {
      "name": "feeRateChangedEvent",
      "discriminator": [
        198,
        44,
        78,
        81,
        101,
        68,
        130,
        79
      ]
    },
    {
      "name": "financialTransactionEvent",
      "discriminator": [
        53,
        189,
        58,
        212,
        96,
        94,
        55,
        149
      ]
    },
    {
      "name": "gracePeriodParametersChangedEvent",
      "discriminator": [
        20,
        63,
        174,
        134,
        143,
        31,
        188,
        234
      ]
    },
    {
      "name": "mailAccountV2RegisterEvent",
      "discriminator": [
        250,
        87,
        69,
        103,
        135,
        185,
        177,
        156
      ]
    },
    {
      "name": "mailAccountV2UpdateEvent",
      "discriminator": [
        239,
        63,
        234,
        251,
        172,
        161,
        13,
        162
      ]
    },
    {
      "name": "mailSendEvent",
      "discriminator": [
        246,
        25,
        155,
        65,
        156,
        90,
        174,
        160
      ]
    },
    {
      "name": "mailV2ReadEvent",
      "discriminator": [
        185,
        241,
        60,
        172,
        90,
        110,
        65,
        90
      ]
    },
    {
      "name": "mailV2SendEvent",
      "discriminator": [
        57,
        95,
        119,
        238,
        197,
        56,
        38,
        155
      ]
    },
    {
      "name": "mailV2UpdateEvent",
      "discriminator": [
        224,
        123,
        44,
        76,
        87,
        109,
        105,
        110
      ]
    },
    {
      "name": "mailV2UpdateLabelEvent",
      "discriminator": [
        25,
        155,
        115,
        145,
        193,
        110,
        174,
        83
      ]
    },
    {
      "name": "marketplaceRevenueReportEvent",
      "discriminator": [
        20,
        8,
        193,
        138,
        70,
        16,
        245,
        166
      ]
    },
    {
      "name": "marketplaceSettingsCreatedEvent",
      "discriminator": [
        152,
        36,
        221,
        52,
        61,
        136,
        113,
        253
      ]
    },
    {
      "name": "marketplaceSettingsUpdatedEvent",
      "discriminator": [
        234,
        193,
        102,
        113,
        14,
        142,
        204,
        191
      ]
    },
    {
      "name": "paymentGatingStatusChangeEvent",
      "discriminator": [
        221,
        72,
        20,
        126,
        189,
        50,
        45,
        215
      ]
    },
    {
      "name": "platformFeeCollectedEvent",
      "discriminator": [
        56,
        187,
        6,
        159,
        22,
        32,
        58,
        175
      ]
    },
    {
      "name": "rateLimitParametersChangedEvent",
      "discriminator": [
        111,
        148,
        192,
        14,
        255,
        206,
        118,
        140
      ]
    },
    {
      "name": "rateLimitResetEvent",
      "discriminator": [
        176,
        64,
        170,
        212,
        240,
        46,
        185,
        63
      ]
    },
    {
      "name": "rateLimitUpdatedEvent",
      "discriminator": [
        117,
        73,
        176,
        253,
        21,
        69,
        103,
        117
      ]
    },
    {
      "name": "rateLimitViolationEvent",
      "discriminator": [
        199,
        192,
        66,
        0,
        33,
        53,
        176,
        250
      ]
    },
    {
      "name": "solmailCollectionCreatedEvent",
      "discriminator": [
        135,
        188,
        144,
        234,
        67,
        63,
        236,
        246
      ]
    },
    {
      "name": "systemStateChangeEvent",
      "discriminator": [
        191,
        208,
        175,
        241,
        211,
        36,
        249,
        116
      ]
    },
    {
      "name": "treasuryRevenueEvent",
      "discriminator": [
        117,
        163,
        237,
        195,
        200,
        247,
        236,
        72
      ]
    },
    {
      "name": "userBidsCleanupEvent",
      "discriminator": [
        165,
        93,
        217,
        22,
        189,
        6,
        70,
        240
      ]
    },
    {
      "name": "usernameAuthorityTransferredEvent",
      "discriminator": [
        169,
        128,
        164,
        236,
        203,
        67,
        147,
        221
      ]
    },
    {
      "name": "usernameBuyEvent",
      "discriminator": [
        201,
        10,
        7,
        172,
        72,
        22,
        125,
        103
      ]
    },
    {
      "name": "usernameClaimedFromBidEvent",
      "discriminator": [
        232,
        32,
        52,
        189,
        10,
        218,
        82,
        161
      ]
    },
    {
      "name": "usernameCreatedEvent",
      "discriminator": [
        186,
        17,
        123,
        213,
        3,
        164,
        96,
        224
      ]
    },
    {
      "name": "usernameMailboxLinkedEvent",
      "discriminator": [
        103,
        167,
        212,
        13,
        44,
        26,
        130,
        58
      ]
    },
    {
      "name": "usernameMailboxUnlinkedEvent",
      "discriminator": [
        239,
        51,
        123,
        120,
        149,
        77,
        191,
        251
      ]
    },
    {
      "name": "usernameNftMintCreatedEvent",
      "discriminator": [
        57,
        71,
        33,
        4,
        156,
        206,
        5,
        153
      ]
    },
    {
      "name": "usernameReservationEvent",
      "discriminator": [
        14,
        173,
        124,
        121,
        169,
        116,
        193,
        18
      ]
    },
    {
      "name": "usernameRewrappedEvent",
      "discriminator": [
        1,
        248,
        89,
        41,
        168,
        31,
        225,
        86
      ]
    },
    {
      "name": "usernameUnwrappedEvent",
      "discriminator": [
        161,
        205,
        89,
        209,
        242,
        30,
        250,
        58
      ]
    },
    {
      "name": "usernameWrappedEvent",
      "discriminator": [
        200,
        217,
        249,
        41,
        22,
        254,
        111,
        128
      ]
    },
    {
      "name": "wrappedUsernameMailboxChangedEvent",
      "discriminator": [
        0,
        207,
        103,
        166,
        125,
        16,
        13,
        185
      ]
    },
    {
      "name": "wrapperFundsWithdrawnEvent",
      "discriminator": [
        193,
        131,
        79,
        12,
        105,
        71,
        36,
        110
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "sameFromAndTo",
      "msg": "Sender and recipient cannot be the same"
    },
    {
      "code": 6001,
      "name": "invalidSender",
      "msg": "Invalid sender address"
    },
    {
      "code": 6002,
      "name": "invalidRecipient",
      "msg": "Invalid recipient address"
    },
    {
      "code": 6003,
      "name": "invalidMailId",
      "msg": "Invalid mail ID"
    },
    {
      "code": 6004,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6005,
      "name": "invalidEncryptionParams",
      "msg": "Invalid encryption params"
    },
    {
      "code": 6006,
      "name": "invalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6007,
      "name": "invalidBody",
      "msg": "The body of your email is too long. The max is 512 chars"
    },
    {
      "code": 6008,
      "name": "invalidSubject",
      "msg": "The subject of your email is too long. The max is 150 chars"
    },
    {
      "code": 6009,
      "name": "invalidSalt",
      "msg": "The salt should be exactly 16 chars"
    },
    {
      "code": 6010,
      "name": "invalidIv",
      "msg": "The IV should be exactly 32 chars"
    },
    {
      "code": 6011,
      "name": "invalidDiffie",
      "msg": "The diffie publickey should be exactly 64 chars"
    },
    {
      "code": 6012,
      "name": "invalidDestination",
      "msg": "From and to address should not be same"
    },
    {
      "code": 6013,
      "name": "invalidSource",
      "msg": "Signer and from address should be same"
    },
    {
      "code": 6014,
      "name": "unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6015,
      "name": "unauthorizedSigner",
      "msg": "Unauthorized signer"
    },
    {
      "code": 6016,
      "name": "invalidLabel",
      "msg": "Invalid label"
    },
    {
      "code": 6017,
      "name": "invalidMailAccount",
      "msg": "Invalid mailaccount"
    },
    {
      "code": 6018,
      "name": "usernameAlreadyExists",
      "msg": "Username already exists"
    },
    {
      "code": 6019,
      "name": "invalidUsername",
      "msg": "Invalid username - must be 1-32 characters, alphanumeric and underscores only"
    },
    {
      "code": 6020,
      "name": "usernameNotFound",
      "msg": "Username not found"
    },
    {
      "code": 6021,
      "name": "usernameAlreadyWrapped",
      "msg": "Username is already wrapped as NFT"
    },
    {
      "code": 6022,
      "name": "usernameNotWrapped",
      "msg": "Username is not wrapped"
    },
    {
      "code": 6023,
      "name": "cannotModifyWrappedUsername",
      "msg": "Cannot modify wrapped username - unwrap first"
    },
    {
      "code": 6024,
      "name": "invalidNewAuthority",
      "msg": "Invalid new authority"
    },
    {
      "code": 6025,
      "name": "invalidMailbox",
      "msg": "Invalid mailbox"
    },
    {
      "code": 6026,
      "name": "wrapperAlreadyExists",
      "msg": "Wrapper already exists for this username"
    },
    {
      "code": 6027,
      "name": "wrapperNotFound",
      "msg": "Wrapper not found"
    },
    {
      "code": 6028,
      "name": "wrapperNotActive",
      "msg": "Wrapper is not active"
    },
    {
      "code": 6029,
      "name": "invalidWrapperState",
      "msg": "Invalid wrapper state"
    },
    {
      "code": 6030,
      "name": "nftMintMismatch",
      "msg": "NFT mint mismatch"
    },
    {
      "code": 6031,
      "name": "invalidNftAmount",
      "msg": "Invalid NFT amount - must be exactly 1"
    },
    {
      "code": 6032,
      "name": "invalidCollectionMint",
      "msg": "Invalid collection mint"
    },
    {
      "code": 6033,
      "name": "collectionNotVerified",
      "msg": "Collection not verified"
    },
    {
      "code": 6034,
      "name": "invalidMetadataAccount",
      "msg": "Invalid metadata account"
    },
    {
      "code": 6035,
      "name": "metadataCreationFailed",
      "msg": "Metadata creation failed"
    },
    {
      "code": 6036,
      "name": "usernameLockedForModifications",
      "msg": "Username is locked for modifications"
    },
    {
      "code": 6037,
      "name": "nftTransferNotAllowed",
      "msg": "NFT transfer not allowed"
    },
    {
      "code": 6038,
      "name": "invalidOriginalAuthority",
      "msg": "Invalid original authority"
    },
    {
      "code": 6039,
      "name": "centralStateNotInitialized",
      "msg": "Central state not initialized"
    },
    {
      "code": 6040,
      "name": "invalidCentralState",
      "msg": "Invalid central state"
    },
    {
      "code": 6041,
      "name": "usernameAlreadyHasMailbox",
      "msg": "Username already has a linked mailbox"
    },
    {
      "code": 6042,
      "name": "usernameNoMailbox",
      "msg": "Username does not have a linked mailbox"
    },
    {
      "code": 6043,
      "name": "invalidMailboxAccount",
      "msg": "Mailbox account does not exist or is invalid"
    },
    {
      "code": 6044,
      "name": "cannotLinkMailboxToWrappedUsername",
      "msg": "Cannot link mailbox to wrapped username"
    },
    {
      "code": 6045,
      "name": "cannotUnlinkMailboxFromWrappedUsername",
      "msg": "Cannot unlink mailbox from wrapped username"
    },
    {
      "code": 6046,
      "name": "usernameMustHaveNoMailboxBeforeWrapping",
      "msg": "Username must have no mailbox before wrapping"
    },
    {
      "code": 6047,
      "name": "mailboxOperationsLocked",
      "msg": "Mailbox operations are locked for this wrapped username"
    },
    {
      "code": 6048,
      "name": "rateLimitExceeded",
      "msg": "Rate limit exceeded: too many usernames created in time window"
    },
    {
      "code": 6049,
      "name": "rateLimitTooFrequent",
      "msg": "Rate limit exceeded: creation too frequent, please wait"
    },
    {
      "code": 6050,
      "name": "invalidRateLimit",
      "msg": "Invalid rate limit account"
    },
    {
      "code": 6051,
      "name": "accountNotInitialized",
      "msg": "Account not initialized or has invalid discriminator"
    },
    {
      "code": 6052,
      "name": "usernameInBiddingPeriod",
      "msg": "Username is currently in bidding period"
    },
    {
      "code": 6053,
      "name": "paymentGatingEnabled",
      "msg": "Payment gating is enabled - must use bidding system"
    },
    {
      "code": 6054,
      "name": "bidTooLow",
      "msg": "Bid amount is below minimum required"
    },
    {
      "code": 6055,
      "name": "bidNotHigherThanCurrent",
      "msg": "Bid amount must be higher than current highest bid"
    },
    {
      "code": 6056,
      "name": "bidNotExpired",
      "msg": "Bid has not expired yet - cannot claim username"
    },
    {
      "code": 6057,
      "name": "notHighestBidder",
      "msg": "You are not the highest bidder"
    },
    {
      "code": 6058,
      "name": "highestBidder",
      "msg": "You the current highest bidder, Cannot claim refund."
    },
    {
      "code": 6059,
      "name": "marketplaceNotInitialized",
      "msg": "Marketplace settings not initialized"
    },
    {
      "code": 6060,
      "name": "invalidMarketplaceSettings",
      "msg": "Invalid marketplace settings"
    },
    {
      "code": 6061,
      "name": "bidAccountNotFound",
      "msg": "Bid account not found"
    },
    {
      "code": 6062,
      "name": "bidAccountNotActive",
      "msg": "Bid account is not active"
    },
    {
      "code": 6063,
      "name": "cannotBidOnOwnBid",
      "msg": "Cannot bid on your own bid"
    },
    {
      "code": 6064,
      "name": "bidAlreadyExpired",
      "msg": "Bid has already expired"
    },
    {
      "code": 6065,
      "name": "usernameAlreadyHasBid",
      "msg": "Username already has an active bid"
    },
    {
      "code": 6066,
      "name": "cannotCancelBid",
      "msg": "Cannot cancel bid - you are not the bidder"
    },
    {
      "code": 6067,
      "name": "insufficientFundsForBid",
      "msg": "Insufficient funds for bid"
    },
    {
      "code": 6068,
      "name": "invalidBidDuration",
      "msg": "Invalid bid duration"
    },
    {
      "code": 6069,
      "name": "marketplaceAuthorityMismatch",
      "msg": "Marketplace authority mismatch"
    },
    {
      "code": 6070,
      "name": "usernameHasActiveBid",
      "msg": "Username has active bid - cannot create directly"
    },
    {
      "code": 6071,
      "name": "paymentRequired",
      "msg": "Payment required - marketplace has payment gating enabled"
    },
    {
      "code": 6072,
      "name": "biddingPaused",
      "msg": "Bidding paused - marketplace has paused bidding system"
    },
    {
      "code": 6073,
      "name": "invalidPreviousBidder",
      "msg": "Invalid previous bidder"
    },
    {
      "code": 6074,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6075,
      "name": "invalidBidAccountState",
      "msg": "Invalid bid account state"
    },
    {
      "code": 6076,
      "name": "insufficientAccountBalance",
      "msg": "Insufficient account balance"
    },
    {
      "code": 6077,
      "name": "bidAmountTooHigh",
      "msg": "Bid amount exceeds maximum allowed"
    },
    {
      "code": 6078,
      "name": "invalidDomainAccount",
      "msg": "Invalid domain account"
    },
    {
      "code": 6079,
      "name": "invalidUsernameCharacters",
      "msg": "Username contains invalid characters"
    },
    {
      "code": 6080,
      "name": "usernameReserved",
      "msg": "Username is reserved and cannot be used"
    },
    {
      "code": 6081,
      "name": "accountSpaceError",
      "msg": "Account space calculation error"
    },
    {
      "code": 6082,
      "name": "invalidBumpSeed",
      "msg": "Invalid account bump seed"
    },
    {
      "code": 6083,
      "name": "accountDeserializationFailed",
      "msg": "Account deserialization failed"
    },
    {
      "code": 6084,
      "name": "invalidAccountDiscriminator",
      "msg": "Invalid account discriminator"
    },
    {
      "code": 6085,
      "name": "invalidTimestamp",
      "msg": "Clock drift detected - invalid timestamp"
    },
    {
      "code": 6086,
      "name": "rentCalculationFailed",
      "msg": "Rent calculation failed"
    },
    {
      "code": 6087,
      "name": "invalidInstructionData",
      "msg": "Invalid instruction data"
    },
    {
      "code": 6088,
      "name": "securityViolation",
      "msg": "Security violation detected"
    },
    {
      "code": 6089,
      "name": "invalidAccountOwner",
      "msg": "Invalid account owner"
    },
    {
      "code": 6090,
      "name": "accountClosureNotPermitted",
      "msg": "Account closure not permitted"
    },
    {
      "code": 6091,
      "name": "invalidAccountState",
      "msg": "Invalid account state or data"
    },
    {
      "code": 6092,
      "name": "mailboxAlreadyLinked",
      "msg": "This mailbox is already linked to another username"
    },
    {
      "code": 6093,
      "name": "mailboxLinkMismatch",
      "msg": "Mailbox link mismatch - username not linked to this mailbox"
    },
    {
      "code": 6094,
      "name": "refundGracePeriodNotMet",
      "msg": "Refund grace period not met - must wait 24 hours after bid expiration"
    },
    {
      "code": 6095,
      "name": "invalidAllDomainProgram",
      "msg": "Invalid AllDomain program - not ANS program"
    },
    {
      "code": 6096,
      "name": "invalidSkrDomainAccount",
      "msg": "Invalid .skr domain account - not owned by ANS program"
    },
    {
      "code": 6097,
      "name": "invalidSkrDomainAccountSize",
      "msg": "Invalid .skr domain account size - too small"
    },
    {
      "code": 6098,
      "name": "invalidSkrDomainAccountData",
      "msg": "Invalid .skr domain account data format"
    },
    {
      "code": 6099,
      "name": "skrDomainOwnerMismatch",
      "msg": ".skr domain account owner does not match authority"
    },
    {
      "code": 6100,
      "name": "invalidSkrTldParent",
      "msg": "Invalid .skr TLD parent account"
    },
    {
      "code": 6101,
      "name": "notSkrDomain",
      "msg": "Not a .skr domain - only .skr domains allowed for Seeker Phone"
    },
    {
      "code": 6102,
      "name": "failedToBorrowAccountData",
      "msg": "Failed to borrow account data"
    },
    {
      "code": 6103,
      "name": "usernameSkrDomainMismatch",
      "msg": "Username does not match .skr domain name"
    },
    {
      "code": 6104,
      "name": "cannotWrapSkrUsername",
      "msg": "Cannot wrap .skr domain usernames as NFT"
    },
    {
      "code": 6105,
      "name": "cannotUnlinkSkrMailbox",
      "msg": "Cannot unlink mailbox from .skr domain username"
    },
    {
      "code": 6106,
      "name": "skrDomainExpired",
      "msg": ".skr domain has expired"
    },
    {
      "code": 6107,
      "name": "invalidNostrKeyLength",
      "msg": "Invalid nostr key length - must be between 1 and 64 characters"
    },
    {
      "code": 6108,
      "name": "cannotModifyMail",
      "msg": "Cannot modify mail - not authorized"
    },
    {
      "code": 6109,
      "name": "mailboxNotLinkedToThisUsername",
      "msg": "Mailbox not linked to this username"
    }
  ],
  "types": [
    {
      "name": "accountValidationFailureEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "account",
            "type": "pubkey"
          },
          {
            "name": "validationType",
            "type": "string"
          },
          {
            "name": "failureReason",
            "type": "string"
          },
          {
            "name": "detectedAt",
            "type": "u32"
          },
          {
            "name": "userInvolved",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "adminActionEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "actionType",
            "type": "string"
          },
          {
            "name": "targetAccount",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "targetUser",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "actionData",
            "type": "string"
          },
          {
            "name": "executedAt",
            "type": "u32"
          },
          {
            "name": "reason",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "bidAccount",
      "docs": [
        "Fixed-size fields first for efficient querying"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentHighestBidder",
            "type": "pubkey"
          },
          {
            "name": "originalCreator",
            "type": "pubkey"
          },
          {
            "name": "bidAmount",
            "type": "u64"
          },
          {
            "name": "bidExpiration",
            "type": "u32"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "bidType",
            "type": {
              "defined": {
                "name": "bidType"
              }
            }
          },
          {
            "name": "totalFeesCollected",
            "type": "u64"
          },
          {
            "name": "cleanupDeadline",
            "type": "u32"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "bidCancelledEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "bidder",
            "type": "pubkey"
          },
          {
            "name": "refundAmount",
            "type": "u64"
          },
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "cancelledAt",
            "type": "u32"
          },
          {
            "name": "timeRemaining",
            "type": "u32"
          },
          {
            "name": "cancellationReason",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "bidCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "bidder",
            "type": "pubkey"
          },
          {
            "name": "bidAmount",
            "type": "u64"
          },
          {
            "name": "bidExpiration",
            "type": "u32"
          },
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "minBidAtCreation",
            "type": "u64"
          },
          {
            "name": "bidderBalanceBefore",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "bidGracePeriodEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "bidder",
            "type": "pubkey"
          },
          {
            "name": "actionType",
            "type": "string"
          },
          {
            "name": "gracePeriodRemaining",
            "type": "u32"
          },
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "checkedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "bidMethod",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "createBid"
          },
          {
            "name": "updateBid"
          }
        ]
      }
    },
    {
      "name": "bidParametersChangedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "previousMinBidTokens",
            "type": "u64"
          },
          {
            "name": "newMinBidTokens",
            "type": "u64"
          },
          {
            "name": "previousMaxBidTokens",
            "type": "u64"
          },
          {
            "name": "newMaxBidTokens",
            "type": "u64"
          },
          {
            "name": "previousMinIncreaseBp",
            "type": "u16"
          },
          {
            "name": "newMinIncreaseBp",
            "type": "u16"
          },
          {
            "name": "changedBy",
            "type": "pubkey"
          },
          {
            "name": "changedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "bidRefundEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "refundedBidder",
            "type": "pubkey"
          },
          {
            "name": "refundAmount",
            "type": "u64"
          },
          {
            "name": "newHighestBidder",
            "type": "pubkey"
          },
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "refundedAt",
            "type": "u32"
          },
          {
            "name": "refundTransactionFee",
            "type": "u64"
          },
          {
            "name": "refundSuccess",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "bidStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "active"
          },
          {
            "name": "outbid"
          },
          {
            "name": "won"
          },
          {
            "name": "cancelled"
          },
          {
            "name": "expired"
          },
          {
            "name": "cleanedUp"
          }
        ]
      }
    },
    {
      "name": "bidStatusChangeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "bidder",
            "type": "pubkey"
          },
          {
            "name": "newStatus",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "bidType",
      "docs": [
        "Bid type enum to track whether bid was created with SOL or MAIL tokens"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "sol"
          },
          {
            "name": "mailToken"
          }
        ]
      }
    },
    {
      "name": "bidUpdatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "previousBidder",
            "type": "pubkey"
          },
          {
            "name": "newBidder",
            "type": "pubkey"
          },
          {
            "name": "previousAmount",
            "type": "u64"
          },
          {
            "name": "newAmount",
            "type": "u64"
          },
          {
            "name": "bidExpiration",
            "type": "u32"
          },
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "updatedAt",
            "type": "u32"
          },
          {
            "name": "amountIncrease",
            "type": "u64"
          },
          {
            "name": "newBidderBalanceBefore",
            "type": "u64"
          },
          {
            "name": "timeRemainingBeforeUpdate",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "broadcastMessageEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "messageType",
            "type": "string"
          },
          {
            "name": "sender",
            "type": "pubkey"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u32"
          },
          {
            "name": "metadata",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "bulkOperationEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "operationType",
            "type": "string"
          },
          {
            "name": "initiatedBy",
            "type": "pubkey"
          },
          {
            "name": "startedAt",
            "type": "u32"
          },
          {
            "name": "completedAt",
            "type": "u32"
          },
          {
            "name": "totalOperations",
            "type": "u32"
          },
          {
            "name": "successfulOperations",
            "type": "u32"
          },
          {
            "name": "failedOperations",
            "type": "u32"
          },
          {
            "name": "totalAmountProcessed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "compressedAccountMeta",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treeInfo",
            "docs": [
              "Merkle tree context."
            ],
            "type": {
              "defined": {
                "name": "packedStateTreeInfo"
              }
            }
          },
          {
            "name": "address",
            "docs": [
              "Address."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "outputStateTreeIndex",
            "docs": [
              "Output merkle tree index."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "compressedMailAccountRegisterEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "account",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "compressedMailAccountUpdateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "account",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "compressedMailData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "Mail ID (unique identifier)"
            ],
            "type": "string"
          },
          {
            "name": "parentId",
            "docs": [
              "Parent mail ID for threading/replies"
            ],
            "type": "string"
          },
          {
            "name": "from",
            "docs": [
              "Sender's public key"
            ],
            "type": "pubkey"
          },
          {
            "name": "to",
            "docs": [
              "Recipient's public key"
            ],
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "docs": [
              "Recipient's mailbox PDA"
            ],
            "type": "pubkey"
          },
          {
            "name": "subject",
            "docs": [
              "Email subject (encrypted)"
            ],
            "type": "string"
          },
          {
            "name": "body",
            "docs": [
              "Email body (encrypted)"
            ],
            "type": "string"
          },
          {
            "name": "authority",
            "docs": [
              "Mail owner (either sender or recipient)"
            ],
            "type": "pubkey"
          },
          {
            "name": "encryptionParams",
            "docs": [
              "Encryption params JSON: {\"iv\": \"...\", \"salt\": \"...\", \"version\": \"...\"}"
            ],
            "type": "string"
          },
          {
            "name": "createdAt",
            "docs": [
              "Creation timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "markAsRead",
            "docs": [
              "Whether mail has been read"
            ],
            "type": "bool"
          },
          {
            "name": "label",
            "docs": [
              "Label for categorization"
            ],
            "type": {
              "defined": {
                "name": "mailLabel"
              }
            }
          }
        ]
      }
    },
    {
      "name": "compressedMailPaymentEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "label",
            "type": {
              "defined": {
                "name": "mailLabel"
              }
            }
          }
        ]
      }
    },
    {
      "name": "compressedMailReadEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "label",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "compressedMailSendEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "compressedMailUpdateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "encryptionParams",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "compressedMailUpdateLabelEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "label",
            "type": {
              "defined": {
                "name": "mailLabel"
              }
            }
          }
        ]
      }
    },
    {
      "name": "compressedProof",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "a",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "b",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "c",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "compressedSolMailAccountData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "nostrKey",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "enhancedMarketplaceSettingsEvent",
      "docs": [
        "Enhanced marketplace settings event with all configurable parameters"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "paymentEnabled",
            "type": "bool"
          },
          {
            "name": "minBidTokens",
            "type": "u64"
          },
          {
            "name": "maxBidTokens",
            "type": "u64"
          },
          {
            "name": "feeRateBasisPoints",
            "type": "u16"
          },
          {
            "name": "bidDurationSecs",
            "type": "u32"
          },
          {
            "name": "minBidIncreaseBasisPoints",
            "type": "u16"
          },
          {
            "name": "maxUsernamesPerWindow",
            "type": "u16"
          },
          {
            "name": "rateLimitWindowSecs",
            "type": "u32"
          },
          {
            "name": "minCreationIntervalSecs",
            "type": "u32"
          },
          {
            "name": "cancellationGracePeriodSecs",
            "type": "u32"
          },
          {
            "name": "refundGracePeriodSecs",
            "type": "u32"
          },
          {
            "name": "updatedAt",
            "type": "u32"
          },
          {
            "name": "updatedBy",
            "type": "pubkey"
          },
          {
            "name": "actionType",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "feeRateChangedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "previousFeeRateBasisPoints",
            "type": "u16"
          },
          {
            "name": "newFeeRateBasisPoints",
            "type": "u16"
          },
          {
            "name": "changedBy",
            "type": "pubkey"
          },
          {
            "name": "changedAt",
            "type": "u32"
          },
          {
            "name": "effectiveImmediately",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "financialTransactionEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "transactionType",
            "type": "string"
          },
          {
            "name": "fromAccount",
            "type": "pubkey"
          },
          {
            "name": "toAccount",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "success",
            "type": "bool"
          },
          {
            "name": "executedAt",
            "type": "u32"
          },
          {
            "name": "relatedUsername",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "transactionFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "gracePeriodParametersChangedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "previousCancellationGracePeriodSecs",
            "type": "u32"
          },
          {
            "name": "newCancellationGracePeriodSecs",
            "type": "u32"
          },
          {
            "name": "previousRefundGracePeriodSecs",
            "type": "u32"
          },
          {
            "name": "newRefundGracePeriodSecs",
            "type": "u32"
          },
          {
            "name": "changedBy",
            "type": "pubkey"
          },
          {
            "name": "changedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "mailAccountV2RegisterEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "account",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailAccountV2UpdateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "account",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailLabel",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "outbox"
          },
          {
            "name": "inbox"
          },
          {
            "name": "read"
          },
          {
            "name": "trash"
          },
          {
            "name": "spam"
          },
          {
            "name": "payment"
          }
        ]
      }
    },
    {
      "name": "mailSendEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mailV2ReadEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "label",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mailV2SendEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailV2UpdateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mailV2UpdateLabelEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "label",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "marketplaceRevenueReportEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reportingPeriodStart",
            "type": "u32"
          },
          {
            "name": "reportingPeriodEnd",
            "type": "u32"
          },
          {
            "name": "totalBidsCreated",
            "type": "u32"
          },
          {
            "name": "totalBidsUpdated",
            "type": "u32"
          },
          {
            "name": "totalUsernamesClaimed",
            "type": "u32"
          },
          {
            "name": "totalPlatformFeesCollected",
            "type": "u64"
          },
          {
            "name": "totalWinningBidRevenue",
            "type": "u64"
          },
          {
            "name": "averageBidAmount",
            "type": "u64"
          },
          {
            "name": "highestSingleBid",
            "type": "u64"
          },
          {
            "name": "uniqueBidders",
            "type": "u32"
          },
          {
            "name": "reportedAt",
            "type": "u32"
          },
          {
            "name": "reportedBy",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "marketplaceSettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paymentEnabled",
            "type": "bool"
          },
          {
            "name": "minBidLamports",
            "type": "u64"
          },
          {
            "name": "minBidTokens",
            "type": "u64"
          },
          {
            "name": "bidDurationSecs",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "solFeeLamports",
            "type": "u64"
          },
          {
            "name": "mailFeeTokens",
            "type": "u64"
          },
          {
            "name": "minBidIncreasePercentage",
            "type": "u16"
          },
          {
            "name": "maxUsernamesPerWindow",
            "type": "u16"
          },
          {
            "name": "rateLimitWindowSeconds",
            "type": "u32"
          },
          {
            "name": "minCreationIntervalSeconds",
            "type": "u32"
          },
          {
            "name": "cancellationGracePeriodSeconds",
            "type": "u32"
          },
          {
            "name": "refundGracePeriodSeconds",
            "type": "u32"
          },
          {
            "name": "maxBidAmountLamports",
            "type": "u64"
          },
          {
            "name": "maxBidAmountTokens",
            "type": "u64"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "minUsernameLength",
            "type": "u8"
          },
          {
            "name": "maxUsernameLength",
            "type": "u8"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "ansProgramId",
            "type": "pubkey"
          },
          {
            "name": "skrTldParent",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "marketplaceSettingsCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "paymentEnabled",
            "type": "bool"
          },
          {
            "name": "minBidLamports",
            "type": "u64"
          },
          {
            "name": "bidDurationSecs",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "createdBy",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "marketplaceSettingsUpdatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "paymentEnabled",
            "type": "bool"
          },
          {
            "name": "minBidLamports",
            "type": "u64"
          },
          {
            "name": "bidDurationSecs",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "updatedAt",
            "type": "u32"
          },
          {
            "name": "updatedBy",
            "type": "pubkey"
          },
          {
            "name": "previousPaymentEnabled",
            "type": "bool"
          },
          {
            "name": "previousMinBidLamports",
            "type": "u64"
          },
          {
            "name": "previousBidDurationSecs",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "marketplaceTreasury",
      "docs": [
        "Simple PDA account for SOL treasury"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalRevenue",
            "type": "u64"
          },
          {
            "name": "totalBidAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "packedAddressTreeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "addressMerkleTreePubkeyIndex",
            "type": "u8"
          },
          {
            "name": "addressQueuePubkeyIndex",
            "type": "u8"
          },
          {
            "name": "rootIndex",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "packedStateTreeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rootIndex",
            "type": "u16"
          },
          {
            "name": "proveByIndex",
            "type": "bool"
          },
          {
            "name": "merkleTreePubkeyIndex",
            "type": "u8"
          },
          {
            "name": "queuePubkeyIndex",
            "type": "u8"
          },
          {
            "name": "leafIndex",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "paymentGatingStatusChangeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "previousStatus",
            "type": "bool"
          },
          {
            "name": "newStatus",
            "type": "bool"
          },
          {
            "name": "changedBy",
            "type": "pubkey"
          },
          {
            "name": "changedAt",
            "type": "u32"
          },
          {
            "name": "affectedPendingBids",
            "type": "u32"
          },
          {
            "name": "newMinBid",
            "type": "u64"
          },
          {
            "name": "newDuration",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "platformFeeCollectedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feePayer",
            "type": "pubkey"
          },
          {
            "name": "feeRecipient",
            "type": "pubkey"
          },
          {
            "name": "feeAmount",
            "type": "u64"
          },
          {
            "name": "originalTransactionAmount",
            "type": "u64"
          },
          {
            "name": "feeRateBasisPoints",
            "type": "u16"
          },
          {
            "name": "transactionType",
            "type": "string"
          },
          {
            "name": "relatedUsername",
            "type": "string"
          },
          {
            "name": "collectedAt",
            "type": "u32"
          },
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "rateLimitParametersChangedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceSettings",
            "type": "pubkey"
          },
          {
            "name": "previousMaxUsernamesPerWindow",
            "type": "u16"
          },
          {
            "name": "newMaxUsernamesPerWindow",
            "type": "u16"
          },
          {
            "name": "previousRateLimitWindowSecs",
            "type": "u32"
          },
          {
            "name": "newRateLimitWindowSecs",
            "type": "u32"
          },
          {
            "name": "previousMinCreationIntervalSecs",
            "type": "u32"
          },
          {
            "name": "newMinCreationIntervalSecs",
            "type": "u32"
          },
          {
            "name": "changedBy",
            "type": "pubkey"
          },
          {
            "name": "changedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "rateLimitResetEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "previousCount",
            "type": "u16"
          },
          {
            "name": "newWindowStart",
            "type": "u32"
          },
          {
            "name": "resetAt",
            "type": "u32"
          },
          {
            "name": "resetReason",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "rateLimitUpdatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "creationCount",
            "type": "u16"
          },
          {
            "name": "windowStart",
            "type": "u32"
          },
          {
            "name": "lastCreationTime",
            "type": "u32"
          },
          {
            "name": "updatedAt",
            "type": "u32"
          },
          {
            "name": "triggerReason",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "rateLimitViolationEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "violationType",
            "type": "string"
          },
          {
            "name": "currentCount",
            "type": "u16"
          },
          {
            "name": "timeUntilNextAllowed",
            "type": "u32"
          },
          {
            "name": "attemptedAt",
            "type": "u32"
          },
          {
            "name": "attemptedUsername",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solMail",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solMailAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nostrKey",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "solMailAccountV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "nostrKey",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "solMailV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "label",
            "type": {
              "defined": {
                "name": "mailLabel"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solMailV3",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "dataVersion",
            "type": "u8"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "label",
            "type": {
              "defined": {
                "name": "mailLabel"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solmailCentralState",
      "docs": [
        "Central State for managing collection and program authority"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tag",
            "type": "u8"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "totalWrapped",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "solmailCollectionCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "centralState",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "systemStateChangeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "changeType",
            "type": "string"
          },
          {
            "name": "previousState",
            "type": "string"
          },
          {
            "name": "newState",
            "type": "string"
          },
          {
            "name": "changedBy",
            "type": "pubkey"
          },
          {
            "name": "changedAt",
            "type": "u32"
          },
          {
            "name": "affectedUsersCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "treasuryRevenueEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "treasuryAccount",
            "type": "pubkey"
          },
          {
            "name": "revenueSource",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "revenueDate",
            "type": "u32"
          },
          {
            "name": "relatedTransaction",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "cumulativeRevenue",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userBid",
      "docs": [
        "Individual UserBid account - one per (user, bid_account) pair"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "bidAmount",
            "type": "u64"
          },
          {
            "name": "totalFeesPaid",
            "type": "u64"
          },
          {
            "name": "totalContributed",
            "type": "u64"
          },
          {
            "name": "bidExpiration",
            "type": "u32"
          },
          {
            "name": "isCurrentHighest",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "lastUpdated",
            "type": "u32"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "bidStatus"
              }
            }
          },
          {
            "name": "bidMethod",
            "type": {
              "defined": {
                "name": "bidMethod"
              }
            }
          },
          {
            "name": "bidType",
            "type": {
              "defined": {
                "name": "bidType"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "userBidsCleanupEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "initialCount",
            "type": "u16"
          },
          {
            "name": "expiredCount",
            "type": "u16"
          },
          {
            "name": "removedCount",
            "type": "u16"
          },
          {
            "name": "finalCount",
            "type": "u16"
          },
          {
            "name": "cleanedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "userRateLimit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "lastCreationTime",
            "type": "u32"
          },
          {
            "name": "creationCount",
            "type": "u16"
          },
          {
            "name": "windowStart",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "usernameAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "isWrapped",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "domainAccount",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "username",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "usernameAuthorityTransferredEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "oldAuthority",
            "type": "pubkey"
          },
          {
            "name": "newAuthority",
            "type": "pubkey"
          },
          {
            "name": "transferredAt",
            "type": "u32"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameBuyEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "usernameClaimedFromBidEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "winner",
            "type": "pubkey"
          },
          {
            "name": "winningBid",
            "type": "u64"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "bidAccount",
            "type": "pubkey"
          },
          {
            "name": "claimedAt",
            "type": "u32"
          },
          {
            "name": "bidDurationActual",
            "type": "u32"
          },
          {
            "name": "totalBidCount",
            "type": "u16"
          },
          {
            "name": "finalBidderCount",
            "type": "u16"
          },
          {
            "name": "marketplaceRevenue",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "usernameCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "creationMethod",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "usernameMailboxLinkedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "linkedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "usernameMailboxUnlinkedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "previousMailbox",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "unlinkedAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "usernameNftMintCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "feePayer",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "usernameReservationEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "reservationType",
            "type": "string"
          },
          {
            "name": "reservedBy",
            "type": "pubkey"
          },
          {
            "name": "reservedAt",
            "type": "u32"
          },
          {
            "name": "expiration",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "associatedAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameRewrappedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "rewrappedAt",
            "type": "u32"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameUnwrappedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "redeemer",
            "type": "pubkey"
          },
          {
            "name": "originalAuthority",
            "type": "pubkey"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "unwrappedAt",
            "type": "u32"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameWrappedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "nftDestination",
            "type": "pubkey"
          },
          {
            "name": "previousMailbox",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "wrappedAt",
            "type": "u32"
          },
          {
            "name": "mailboxLocked",
            "type": "bool"
          },
          {
            "name": "transferAllowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "usernameWrapper",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tag",
            "type": {
              "defined": {
                "name": "wrapperTag"
              }
            }
          },
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "originalAuthority",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "mailboxLocked",
            "type": "bool"
          },
          {
            "name": "transferAllowed",
            "type": "bool"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "validityProof",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "option": {
              "defined": {
                "name": "compressedProof"
              }
            }
          }
        ]
      }
    },
    {
      "name": "wrappedUsernameMailboxChangedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "nftOwner",
            "type": "pubkey"
          },
          {
            "name": "oldMailbox",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "newMailbox",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "changedAt",
            "type": "u32"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "wrapperFundsWithdrawnEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "splAmount",
            "type": "u64"
          },
          {
            "name": "solAmount",
            "type": "u64"
          },
          {
            "name": "withdrawnAt",
            "type": "u32"
          },
          {
            "name": "withdrawnBy",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "wrapperTag",
      "docs": [
        "Wrapper state tags for tracking tokenization status"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "uninitialized"
          },
          {
            "name": "activeWrapper"
          },
          {
            "name": "inactiveWrapper"
          }
        ]
      }
    }
  ]
};
