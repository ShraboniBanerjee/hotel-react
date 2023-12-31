import React, {useState} from "react";
import adminLayout from "../../hoc/adminLayout";
import { Button, Form, Table } from "react-bootstrap";
import './doc_scanner.css'
import NewGuest from "./registerGuest";


function CountryCode(){
  let country_dict = {'ABW': 297, 'AFG': 93, 'AGO': 244, 'AIA': 1, 'ALA': 358, 'ALB': 355, 'AND': 376, 'ARE': 971, 'ARG': 54, 'ARM': 374, 'ASM': 1, 'ATA': 0, 'ATF': 0, 'ATG': 1, 'AUS': 61, 'AUT': 43, 'AZE': 994, 'BDI': 257, 'BEL': 32, 'BEN': 229, 'BES': 599, 'BFA': 226, 'BGD': 880, 'BGR': 359, 'BHR': 973, 'BHS': 1, 'BIH': 387, 'BLM': 590, 'BLR': 375, 'BLZ': 501, 'BMU': 1, 'BOL': 591, 'BRA': 55, 'BRB': 1, 'BRN': 673, 'BTN': 975, 'BVT': 0, 'BWA': 267, 'CAF': 236, 'CAN': 1, 'CCK': 61, 'CHE': 41, 'CHL': 56, 'CHN': 86, 'CIV': 225, 'CMR': 237, 'COD': 243, 'COG': 242, 'COK': 682, 'COL': 57, 'COM': 269, 'CPV': 238, 'CRI': 506, 'CUB': 53, 'CUW': 599, 'CXR': 61, 'CYM': 1, 'CYP': 357, 'CZE': 420, 'DEU': 49, 'DJI': 253, 'DMA': 1, 'DNK': 45, 'DOM': 1, 'DZA': 213, 'ECU': 593, 'EGY': 20, 'ERI': 291, 'ESH': 212, 'ESP': 34, 'EST': 372, 'ETH': 251, 'FIN': 358, 'FJI': 679, 'FLK': 500, 'FRA': 33, 'FRO': 298, 'FSM': 691, 'GAB': 241, 'GBR': 44, 'GEO': 995, 'GGY': 44, 'GHA': 233, 'GIB': 350, 'GIN': 224, 'GLP': 590, 'GMB': 220, 'GNB': 245, 'GNQ': 240, 'GRC': 30, 'GRD': 1, 'GRL': 299, 'GTM': 502, 'GUF': 594, 'GUM': 1, 'GUY': 592, 'HKG': 852, 'HMD': 0, 'HND': 504, 'HRV': 385, 'HTI': 509, 'HUN': 36, 'IDN': 62, 'IMN': 44, 'IND': 91, 'IOT': 246, 'IRL': 353, 'IRN': 98, 'IRQ': 964, 'ISL': 354, 'ISR': 972, 'ITA': 39, 'JAM': 1, 'JEY': 44, 'JOR': 962, 'JPN': 81, 'KAZ': 7, 'KEN': 254, 'KGZ': 996, 'KHM': 855, 'KIR': 686, 'KNA': 1, 'KOR': 82, 'KWT': 965, 'LAO': 856, 'LBN': 961, 'LBR': 231, 'LBY': 218, 'LCA': 1, 'LIE': 423, 'LKA': 94, 'LSO': 266, 'LTU': 370, 'LUX': 352, 'LVA': 371, 'MAC': 853, 'MAF': 590, 'MAR': 212, 'MCO': 377, 'MDA': 373, 'MDG': 261, 'MDV': 960, 'MEX': 52, 'MHL': 692, 'MKD': 389, 'MLI': 223, 'MLT': 356, 'MMR': 95, 'MNE': 382, 'MNG': 976, 'MNP': 1, 'MOZ': 258, 'MRT': 222, 'MSR': 1, 'MTQ': 596, 'MUS': 230, 'MWI': 265, 'MYS': 60, 'MYT': 262, 'NAM': 264, 'NCL': 687, 'NER': 227, 'NFK': 672, 'NGA': 234, 'NIC': 505, 'NIU': 683, 'NLD': 31, 'NOR': 47, 'NPL': 977, 'NRU': 674, 'NZL': 64, 'OMN': 968, 'PAK': 92, 'PAN': 507, 'PCN': 0, 'PER': 51, 'PHL': 63, 'PLW': 680, 'PNG': 675, 'POL': 48, 'PRI': 1, 'PRK': 850, 'PRT': 351, 'PRY': 595, 'PSE': 970, 'PYF': 689, 'QAT': 974, 'REU': 262, 'ROU': 40, 'RUS': 7, 'RWA': 250, 'SAU': 966, 'SDN': 249, 'SEN': 221, 'SGP': 65, 'SGS': 0, 'SHN': 290, 'SJM': 47, 'SLB': 677, 'SLE': 232, 'SLV': 503, 'SMR': 378, 'SOM': 252, 'SPM': 508, 'SRB': 381, 'SSD': 211, 'STP': 239, 'SUR': 597, 'SVK': 421, 'SVN': 386, 'SWE': 46, 'SWZ': 268, 'SXM': 1, 'SYC': 248, 'SYR': 963, 'TCA': 1, 'TCD': 235, 'TGO': 228, 'THA': 66, 'TJK': 992, 'TKL': 690, 'TKM': 993, 'TLS': 670, 'TON': 676, 'TTO': 1, 'TUN': 216, 'TUR': 90, 'TUV': 688, 'TWN': 886, 'TZA': 255, 'UGA': 256, 'UKR': 380, 'UMI': 0, 'URY': 598, 'USA': 1, 'UZB': 998, 'VAT': 39, 'VCT': 1, 'VEN': 58, 'VGB': 1, 'VIR': 1, 'VNM': 84, 'VUT': 678, 'WLF': 681, 'WSM': 685, 'YEM': 967, 'ZAF': 27, 'ZMB': 260, 'ZWE': 263}
  return (
    <div>
      <select name="country_names" class="form-control top_pad">
        {Object.keys(country_dict).map((key, value) => {return(<option value={country_dict[key]}>{key}(+{country_dict[key]})</option>)})}
      </select>
    </div>
  )
}


function GuestDetails({existing}){
        return (
            <div class='small_font'>
            <div class="row padded">
                <div class="botttom_pad">We will use these details to share your booking information</div>
                <div class="col-sm-4">
                  First Name
                  <input type="text" class="form-control top_pad"></input>
                </div>
                <div class="col-sm-3"></div>
                <div class="col-sm-4">
                  Last Name
                  <input type="text" class="form-control top_pad"></input>
                </div>
            </div>
              <div class="row padded bottom_pad">
                <div class="col-sm-4">Email <div><input type="text" class="form-control top_pad"></input></div></div>
                <div class="col-sm-3">Country Code<div>
                  <CountryCode />
                </div></div>
                <div class="col-sm-4">Phone Number <div><input type="text" class="form-control top_pad"></input></div></div>
              </div>
            <NewGuest existing={existing} />
            </div>
          )
}

export default GuestDetails