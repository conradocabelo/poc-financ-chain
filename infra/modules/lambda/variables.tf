variable "bucket-name-services" {
  type = string
  default = "poc-financ-chain-x0001"
}

variable "services" {
  type = list(object({
    name           = string    
    handler        = string
    runtime        = string                                
    size_memory    = number
  }))
  default = [ 
    {
       name = "lmb-api-project",
       handler = "index.handler",
       runtime = "",
       size_memory = 512
    } 
  ]
}