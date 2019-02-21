<template>
</template>
<script type="text/javascript">
import sb_base_classes from '../../assets/sbdb/base-classes.json'
import sb_disciplines from '../../assets/sbdb/disciplines.json'
import sb_mastery_runes from '../../assets/sbdb/mastery-runes.json'
import sb_races from '../../assets/sbdb/races.json'
import sb_prestige_classes from '../../assets/sbdb/prestige-classes.json'
import sb_starting_traits from '../../assets/sbdb/starting-traits.json'
import sb_stat_runes from '../../assets/sbdb/stat-runes.json'
import sb_starting_attributes from '../../assets/sbdb/starting-attributes.json'
import sb_init_stats from '../../assets/sbdb/init_stats.json'

function get_sb_base_classes () {
  return sb_base_classes;
}
function get_sb_disciplines () {
  return sb_disciplines;
}
function get_sb_mastery_runes () {
  return sb_mastery_runes;
}
function get_sb_races () {
  return sb_races;
}
function get_sb_prestige_classes () {
  return sb_prestige_classes;
}
function get_sb_starting_traits () {
  return sb_starting_traits;
}
function get_sb_stat_runes () {
  return sb_stat_runes;
}
function get_sb_starting_attributes () {
  return sb_starting_attributes;
}
function get_sb_init_stats () {
  return sb_init_stats;
}



export default{
  get_sb_base_classes,
  get_sb_disciplines,
  get_sb_mastery_runes,
  get_sb_races,
  get_sb_prestige_classes,
  get_sb_starting_traits,
  get_sb_stat_runes,
  get_sb_starting_attributes,
  get_sb_init_stats
}
</script>
<style>
</style>