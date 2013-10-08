<?php
/**
 * @file
 * node_basket.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function node_basket_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function node_basket_views_api() {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function node_basket_node_info() {
  $items = array(
    'node_basket' => array(
      'name' => t('Basket'),
      'base' => 'node_content',
      'description' => t('Holds referenced nodes'),
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
  );
  return $items;
}
